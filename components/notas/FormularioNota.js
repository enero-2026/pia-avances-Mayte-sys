import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';

export default function FormularioNota({ 
  titulo, setTitulo, subtitulo, setSubtitulo, texto, setTexto, 
  editandoId, guardarNota, limpiarFormulario, modalVisible 
}) {
  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true}>
      <View style={styles.fondoOscuro}>
        <View style={styles.formulario}>
          <Text style={styles.tituloFormulario}>{editandoId ? 'Editando Nota' : 'Nueva Nota'}</Text>
          
          <TextInput 
            style={styles.input} 
            placeholder="Título (Obligatorio)" 
            value={titulo} 
            onChangeText={setTitulo} 
          />
          <TextInput 
            style={styles.input} 
            placeholder="Subtítulo (Opcional)" 
            value={subtitulo} 
            onChangeText={setSubtitulo} 
          />
          <TextInput 
            style={[styles.input, styles.inputMultilinea]} 
            placeholder="Escribe tu nota aquí... (Obligatorio)" 
            value={texto} 
            onChangeText={setTexto}
            multiline={true}
            textAlignVertical="top" // Mantiene el texto arriba en Android
          />
          
          <TouchableOpacity style={[styles.botonAgregar, editandoId && { backgroundColor: '#eab308' }]} onPress={guardarNota}>
            <Text style={styles.textoBotonAgregar}>{editandoId ? 'Actualizar Nota' : 'Guardar Nota'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botonCancelar} onPress={limpiarFormulario}>
            <Text style={styles.textoCancelar}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fondoOscuro: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  formulario: { backgroundColor: '#fff', padding: 20, borderRadius: 15, elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4 },
  tituloFormulario: { fontSize: 20, fontWeight: 'bold', color: '#59b2ab', marginBottom: 15, textAlign: 'center' },
  input: { backgroundColor: '#f9fafb', borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, paddingHorizontal: 15, height: 50, marginBottom: 15 },
  inputMultilinea: { height: 120, paddingTop: 15 },
  botonAgregar: { backgroundColor: '#59b2ab', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  textoBotonAgregar: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  botonCancelar: { marginTop: 15, paddingVertical: 12, backgroundColor: '#fef2f2', borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#fecaca' },
  textoCancelar: { color: '#ef4444', fontWeight: 'bold', fontSize: 16 },
});