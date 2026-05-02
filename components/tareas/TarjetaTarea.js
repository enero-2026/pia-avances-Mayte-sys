import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function TarjetaTarea({ item, iniciarEdicion, confirmarEliminacion }) {
  const obtenerColorBorde = (fechaFinaliso) => {
    const ahora = new Date();
    const limite = new Date(fechaFinaliso);
    const diferenciaHoras = (limite - ahora) / (1000 * 60 * 60);

    if (diferenciaHoras <= 24) return '#ef4444'; 
    if (diferenciaHoras <= 168) return '#eab308'; 
    return '#22c55e'; 
  };

  const colorLinea = obtenerColorBorde(item.fechaFinal);
  const fechaFormateada = new Date(item.fechaFinal).toLocaleString('es-MX', {
    weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
  });

  return (
    <View style={[styles.tarjetaTarea, { borderLeftColor: colorLinea }]}>
      <View style={styles.infoTarea}>
        <Text style={styles.textoMateria}>{item.materia}</Text>
        <Text style={styles.textoNombre}>{item.nombre}</Text>
        <Text style={styles.textoFecha}>Entrega: {fechaFormateada}</Text>
      </View>
      
      <View style={styles.accionesBotones}>
        <TouchableOpacity style={styles.botonEditar} onPress={() => iniciarEdicion(item)}>
          <Text style={styles.textoEditar}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonEliminar} onPress={() => confirmarEliminacion(item.id, item.nombre)}>
          <Text style={styles.textoEliminar}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tarjetaTarea: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 12, borderLeftWidth: 6, elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  infoTarea: { flex: 1, paddingRight: 10 },
  textoMateria: { fontSize: 12, color: '#6b7280', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: 2 },
  textoNombre: { fontSize: 18, color: '#1f2937', fontWeight: 'bold', marginBottom: 5 },
  textoFecha: { fontSize: 14, color: '#4b5563' },
  accionesBotones: { alignItems: 'flex-end', justifyContent: 'center' },
  botonEditar: { backgroundColor: '#eff6ff', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 5, marginBottom: 8, borderWidth: 1, borderColor: '#bfdbfe' },
  textoEditar: { color: '#3b82f6', fontWeight: 'bold', fontSize: 12 },
  botonEliminar: { backgroundColor: '#fef2f2', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 5, borderWidth: 1, borderColor: '#fecaca' },
  textoEliminar: { color: '#ef4444', fontWeight: 'bold', fontSize: 12 },
});