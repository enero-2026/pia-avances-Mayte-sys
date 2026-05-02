import { useState, useEffect } from 'react';
// IMPORTANTE: Agregamos Platform
import { Alert, Platform } from 'react-native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

export const useTareas = () => {
  const [tareas, setTareas] = useState([]);
  const [nombre, setNombre] = useState('');
  const [materia, setMateria] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [editandoId, setEditandoId] = useState(null);
  
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    cargarTareas();
    configurarNotificaciones();
  }, []);

  const configurarNotificaciones = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') alert('Se necesitan permisos para notificaciones.');

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'Tareas',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  };

  const cargarTareas = async () => {
    try {
      const guardadas = await AsyncStorage.getItem('@mis_tareas');
      if (guardadas !== null) setTareas(JSON.parse(guardadas));
    } catch (e) { console.log(e); }
  };

  const guardarEnMemoria = async (nuevasTareas) => {
    try { await AsyncStorage.setItem('@mis_tareas', JSON.stringify(nuevasTareas)); } 
    catch (e) { console.log(e); }
  };

  const programarNotificacion = async (tareaNombre, tareaMateria, fechaEntrega) => {
    const fechaNotif = new Date(fechaEntrega);
    fechaNotif.setDate(fechaNotif.getDate() - 1);
    const segundos = Math.floor((fechaNotif.getTime() - Date.now()) / 1000);

    if (segundos > 0) {
      await Notifications.scheduleNotificationAsync({
        content: { 
          title: '⚠️ Tarea próxima', 
          body: `Tu tarea "${tareaNombre}" de ${tareaMateria} vence mañana.` 
        },
        trigger: { 
          type: 'timeInterval',
          seconds: segundos,
          channelId: 'default'
        },
      });
    }
  };

  const guardarTarea = async () => {
    if (nombre.trim() === '' || materia.trim() === '') return alert('Llena todos los campos');

    let nuevasTareas;
    if (editandoId) {
      nuevasTareas = tareas.map((t) => t.id === editandoId ? { ...t, nombre, materia, fechaFinal: fecha.toISOString() } : t);
    } else {
      nuevasTareas = [...tareas, { id: Date.now().toString(), nombre, materia, fechaFinal: fecha.toISOString() }];
    }

    setTareas(nuevasTareas);
    guardarEnMemoria(nuevasTareas);
    await programarNotificacion(nombre, materia, fecha);
    limpiarFormulario();
  };

  const iniciarEdicion = (tarea) => {
    setNombre(tarea.nombre); 
    setMateria(tarea.materia); 
    setFecha(new Date(tarea.fechaFinal)); 
    setEditandoId(tarea.id);
    setModalVisible(true);
  };

  const limpiarFormulario = () => {
    setNombre(''); 
    setMateria(''); 
    setFecha(new Date()); 
    setEditandoId(null);
    setModalVisible(false);
  };

  const eliminarTarea = (id) => {
    const restantes = tareas.filter(t => t.id !== id);
    setTareas(restantes);
    guardarEnMemoria(restantes);
    if (editandoId === id) limpiarFormulario();
  };

  const confirmarEliminacion = (id, nombreTarea) => {
    Alert.alert("Eliminar", `¿Borrar "${nombreTarea}"?`, [
      { text: "Cancelar", style: "cancel" },
      { text: "Eliminar", style: "destructive", onPress: () => eliminarTarea(id) }
    ]);
  };

  return {
    tareas, nombre, setNombre, materia, setMateria, fecha, setFecha, editandoId,
    modalVisible, setModalVisible,
    guardarTarea, iniciarEdicion, limpiarFormulario, confirmarEliminacion
  };
};