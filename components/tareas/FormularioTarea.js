import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function FormularioTarea({ 
  nombre, setNombre, materia, setMateria, fecha, setFecha, 
  editandoId, guardarTarea, limpiarFormulario,
  modalVisible 
}) {
  const [mostrarPicker, setMostrarPicker] = useState(false);
  const [modoPicker, setModoPicker] = useState('date');

  const onChangeFecha = (event, fechaSeleccionada) => {
    setMostrarPicker(false);
    if (fechaSeleccionada) {
      setFecha(fechaSeleccionada);
      if (modoPicker === 'date' && Platform.OS === 'android') {
        setTimeout(() => { setModoPicker('time'); setMostrarPicker(true); }, 100);
      }
    }
  };

  const mostrarSelector = (modo) => { setModoPicker(modo); setMostrarPicker(true); };

  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true}>
      <View style={styles.fondoOscuro}>
        <View style={styles.formulario}>
          <Text style={styles.tituloFormulario}>{editandoId ? 'Editando Tarea' : 'Nueva Tarea'}</Text>
          
          <TextInput style={styles.input} placeholder="Nombre de la tarea" value={nombre} onChangeText={setNombre} />
          <TextInput style={styles.input} placeholder="Materia" value={materia} onChangeText={setMateria} />
          
          <View style={styles.filaBotones}>
            <TouchableOpacity style={styles.botonFecha} onPress={() => mostrarSelector('date')}>
              <Text style={styles.textoBotonFecha}>📅 Elegir Fecha</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.botonAgregar, editandoId && { backgroundColor: '#eab308' }]} onPress={guardarTarea}>
              <Text style={styles.textoBotonAgregar}>{editandoId ? 'Actualizar' : 'Agregar'}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.botonCancelar} onPress={limpiarFormulario}>
            <Text style={styles.textoCancelar}>Cancelar</Text>
          </TouchableOpacity>

          <Text style={styles.fechaSeleccionada}>
            Seleccionada: {fecha.toLocaleString('es-MX', {day: 'numeric', month: 'short', hour: '2-digit', minute:'2-digit'})}
          </Text>

          {mostrarPicker && (
            <DateTimePicker value={fecha} mode={modoPicker} is24Hour={true} minimumDate={new Date()} onChange={onChangeFecha} />
          )}
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
  filaBotones: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 },
  botonFecha: { backgroundColor: '#e5e7eb', paddingVertical: 12, paddingHorizontal: 15, borderRadius: 8, flex: 1, marginRight: 10, alignItems: 'center' },
  textoBotonFecha: { color: '#4b5563', fontWeight: 'bold' },
  botonAgregar: { backgroundColor: '#59b2ab', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, alignItems: 'center', minWidth: 100 },
  textoBotonAgregar: { color: '#fff', fontWeight: 'bold' },
  botonCancelar: { marginTop: 15, paddingVertical: 12, backgroundColor: '#fef2f2', borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#fecaca' },
  textoCancelar: { color: '#ef4444', fontWeight: 'bold' },
  fechaSeleccionada: { marginTop: 15, fontSize: 12, color: '#6b7280', textAlign: 'center' },
});