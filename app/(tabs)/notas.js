import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import { useNotas } from '../../hooks/useNotas';
import TarjetaNota from '../../components/notas/TarjetaNota';
import FormularioNota from '../../components/notas/FormularioNota';

export default function Notas() {
  const {
    notas, titulo, setTitulo, subtitulo, setSubtitulo, texto, setTexto, editandoId,
    modalVisible, setModalVisible,
    guardarNota, iniciarEdicion, limpiarFormulario, confirmarEliminacion
  } = useNotas();

  return (
    <View style={styles.contenedor}>
      <Text style={styles.tituloHeader}>Mis Notas</Text>
      
      <FormularioNota 
        titulo={titulo} setTitulo={setTitulo}
        subtitulo={subtitulo} setSubtitulo={setSubtitulo}
        texto={texto} setTexto={setTexto}
        editandoId={editandoId}
        modalVisible={modalVisible}
        guardarNota={guardarNota}
        limpiarFormulario={limpiarFormulario}
      />

      <FlatList
        data={notas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TarjetaNota item={item} iniciarEdicion={iniciarEdicion} confirmarEliminacion={confirmarEliminacion} />
        )}
        ListEmptyComponent={<Text style={styles.textoVacio}>No tienes notas guardadas.</Text>}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }} 
      />

      <TouchableOpacity style={styles.botonFlotante} onPress={() => setModalVisible(true)}>
        <Text style={styles.textoBotonFlotante}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#f4f4f5', paddingTop: 50, paddingHorizontal: 20 },
  tituloHeader: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  textoVacio: { textAlign: 'center', color: '#888', marginTop: 40, fontSize: 16 },
  botonFlotante: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#3b82f6', 
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