import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import { useTareas } from '../../hooks/useTareas';
import TarjetaTarea from '../../components/tareas/TarjetaTarea';
import FormularioTarea from '../../components/tareas/FormularioTarea';

export default function TareasScreen() {
  const {
    tareas, nombre, setNombre, materia, setMateria, fecha, setFecha, editandoId,
    modalVisible, setModalVisible, // Recibimos el estado del modal
    guardarTarea, iniciarEdicion, limpiarFormulario, confirmarEliminacion
  } = useTareas();

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Mis Tareas</Text>
      
      <FormularioTarea 
        nombre={nombre} setNombre={setNombre}
        materia={materia} setMateria={setMateria}
        fecha={fecha} setFecha={setFecha}
        editandoId={editandoId}
        modalVisible={modalVisible} 
        guardarTarea={guardarTarea}
        limpiarFormulario={limpiarFormulario}
      />

      <FlatList
        data={tareas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TarjetaTarea item={item} iniciarEdicion={iniciarEdicion} confirmarEliminacion={confirmarEliminacion} />
        )}
        ListEmptyComponent={<Text style={styles.textoVacio}>No hay tareas pendientes.</Text>}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }} 
      />

      {/* Botón Flotante para agregar nueva tarea */}
      <TouchableOpacity style={styles.botonFlotante} onPress={() => setModalVisible(true)}>
        <Text style={styles.textoBotonFlotante}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#f4f4f5', paddingTop: 50, paddingHorizontal: 20 },
  titulo: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  textoVacio: { textAlign: 'center', color: '#888', marginTop: 40, fontSize: 16 },
  
  botonFlotante: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#59b2ab',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  textoBotonFlotante: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'normal',
    marginTop: -3, 
  }
});