import { useState, useEffect } from 'react';
import { Alert, Platform } from 'react-native'; // Agregamos Platform
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system/legacy';
import * as IntentLauncher from 'expo-intent-launcher'; 

export const useArchivos = () => {
  const [elementos, setElementos] = useState([]); 
  const [carpetaActualId, setCarpetaActualId] = useState(null); 
  
  const [modalCarpetaVisible, setModalCarpetaVisible] = useState(false);
  const [nombreNuevaCarpeta, setNombreNuevaCarpeta] = useState('');

  useEffect(() => { cargarElementos(); }, []);

  const cargarElementos = async () => {
    try {
      const guardados = await AsyncStorage.getItem('@mis_archivos_v2');
      if (guardados !== null) setElementos(JSON.parse(guardados));
    } catch (e) { console.log(e); }
  };

  const guardarEnMemoria = async (nuevos) => {
    try { await AsyncStorage.setItem('@mis_archivos_v2', JSON.stringify(nuevos)); } 
    catch (e) { console.log(e); }
  };

  const agregarArchivo = async () => {
    try {
      const resultado = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: true });
      if (resultado.canceled) return;

      const archivo = resultado.assets ? resultado.assets[0] : resultado;
      if (!archivo.uri) throw new Error("El sistema no pudo encontrar la ruta del archivo.");

      const nombreLimpio = archivo.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const nuevaRuta = FileSystem.documentDirectory + Date.now() + '_' + nombreLimpio;

      await FileSystem.copyAsync({ from: archivo.uri, to: nuevaRuta });

      const nuevoItem = {
        id: Date.now().toString(),
        tipo: 'archivo', 
        nombre: archivo.name,
        uriLocal: nuevaRuta,
        tamaño: archivo.size,
        parentId: carpetaActualId 
      };

      const nuevaLista = [...elementos, nuevoItem];
      setElementos(nuevaLista);
      guardarEnMemoria(nuevaLista);

    } catch (error) {
      Alert.alert('Error al guardar', error.message || 'Hubo un problema de permisos en tu dispositivo.');
    }
  };

  const crearCarpeta = () => {
    if (nombreNuevaCarpeta.trim() === '') return Alert.alert('Atención', 'Ponle un nombre a tu carpeta.');
    
    const nuevaCarpeta = {
      id: Date.now().toString(),
      tipo: 'carpeta', 
      nombre: nombreNuevaCarpeta,
      parentId: carpetaActualId
    };

    const nuevaLista = [...elementos, nuevaCarpeta];
    setElementos(nuevaLista);
    guardarEnMemoria(nuevaLista);
    setNombreNuevaCarpeta('');
    setModalCarpetaVisible(false);
  };

  const entrarCarpeta = (id) => setCarpetaActualId(id);

  const volverCarpeta = () => {
    if (!carpetaActualId) return;
    const carpetaActual = elementos.find(e => e.id === carpetaActualId);
    setCarpetaActualId(carpetaActual ? carpetaActual.parentId : null);
  };

  const abrirArchivo = async (uriLocal) => {
    try {
      if (Platform.OS === 'android') {
        // En Android, convertimos la ruta a un formato de "Contenido" que el sistema entienda
        const contentUri = await FileSystem.getContentUriAsync(uriLocal);
        
        // Lanzamos el comando "ACTION_VIEW" para que aparezca el menú de "Abrir con..."
        await IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
          data: contentUri,
          flags: 1, // Esto le da permiso temporal a la otra app para leer tu archivo
        });
      } else {
        // En iOS / Apple, Sharing ya cumple la función de visor de documentos por defecto
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(uriLocal);
        } else {
          Alert.alert('Ups', 'Tu dispositivo no permite abrir esto.');
        }
      }
    } catch (error) { 
      Alert.alert('Error', 'No se pudo abrir el archivo. ¿Seguro que tienes una app instalada para leer este formato?'); 
      console.log(error);
    }
  };

  const obtenerIdsAEliminar = (idActual, listaCompleta) => {
    let ids = [idActual];
    const hijos = listaCompleta.filter(e => e.parentId === idActual);
    for (let hijo of hijos) {
      ids = ids.concat(obtenerIdsAEliminar(hijo.id, listaCompleta));
    }
    return ids;
  };

  const eliminarItem = async (item) => {
    try {
      const idsABorrar = obtenerIdsAEliminar(item.id, elementos);
      const itemsABorrar = elementos.filter(e => idsABorrar.includes(e.id));

      for (let i of itemsABorrar) {
        if (i.tipo === 'archivo' && i.uriLocal) {
          await FileSystem.deleteAsync(i.uriLocal, { idempotent: true }).catch(() => {});
        }
      }

      const restantes = elementos.filter(e => !idsABorrar.includes(e.id));
      setElementos(restantes);
      guardarEnMemoria(restantes);
    } catch (error) { Alert.alert("Error", "No se pudo eliminar correctamente."); }
  };

  const confirmarEliminacion = (item) => {
    const advertencia = item.tipo === 'carpeta' 
      ? `¿Borrar la carpeta "${item.nombre}" y todo lo que tiene adentro?` 
      : `¿Borrar el archivo "${item.nombre}"?`;

    Alert.alert("Confirmar", advertencia, [
      { text: "Cancelar", style: "cancel" },
      { text: "Eliminar", style: "destructive", onPress: () => eliminarItem(item) }
    ]);
  };

  const carpetaActual = elementos.find(e => e.id === carpetaActualId);
  const carpetaActualNombre = carpetaActual ? carpetaActual.nombre : null;

  return {
    elementosActuales: elementos.filter(e => e.parentId === carpetaActualId),
    carpetaActualId,
    carpetaActualNombre, 
    modalCarpetaVisible, setModalCarpetaVisible,
    nombreNuevaCarpeta, setNombreNuevaCarpeta,
    agregarArchivo, crearCarpeta, entrarCarpeta, volverCarpeta,
    abrirArchivo, confirmarEliminacion
  };
};