import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useNotas = () => {
  const [notas, setNotas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [subtitulo, setSubtitulo] = useState('');
  const [texto, setTexto] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    cargarNotas();
  }, []);

  const cargarNotas = async () => {
    try {
      const guardadas = await AsyncStorage.getItem('@mis_notas');
      if (guardadas !== null) setNotas(JSON.parse(guardadas));
    } catch (e) { console.log(e); }
  };

  const guardarEnMemoria = async (nuevasNotas) => {
    try { await AsyncStorage.setItem('@mis_notas', JSON.stringify(nuevasNotas)); } 
    catch (e) { console.log(e); }
  };

  const guardarNota = () => {
    // Validación: Título y Texto son obligatorios. Subtítulo es opcional.
    if (titulo.trim() === '' || texto.trim() === '') {
      return Alert.alert('Error', 'El título y el texto de la nota son obligatorios.');
    }

    let nuevasNotas;
    if (editandoId) {
      nuevasNotas = notas.map((n) => 
        n.id === editandoId ? { ...n, titulo, subtitulo, texto } : n
      );
    } else {
      nuevasNotas = [...notas, { id: Date.now().toString(), titulo, subtitulo, texto }];
    }

    setNotas(nuevasNotas);
    guardarEnMemoria(nuevasNotas);
    limpiarFormulario();
  };

  const iniciarEdicion = (nota) => {
    setTitulo(nota.titulo); 
    setSubtitulo(nota.subtitulo || ''); 
    setTexto(nota.texto); 
    setEditandoId(nota.id);
    setModalVisible(true);
  };

  const limpiarFormulario = () => {
    setTitulo(''); 
    setSubtitulo(''); 
    setTexto(''); 
    setEditandoId(null);
    setModalVisible(false);
  };

  const eliminarNota = (id) => {
    const restantes = notas.filter(n => n.id !== id);
    setNotas(restantes);
    guardarEnMemoria(restantes);
    if (editandoId === id) limpiarFormulario();
  };

  const confirmarEliminacion = (id, tituloNota) => {
    Alert.alert("Eliminar Nota", `¿Borrar "${tituloNota}"?`, [
      { text: "Cancelar", style: "cancel" },
      { text: "Eliminar", style: "destructive", onPress: () => eliminarNota(id) }
    ]);
  };

  return {
    notas, titulo, setTitulo, subtitulo, setSubtitulo, texto, setTexto, editandoId,
    modalVisible, setModalVisible,
    guardarNota, iniciarEdicion, limpiarFormulario, confirmarEliminacion
  };
};