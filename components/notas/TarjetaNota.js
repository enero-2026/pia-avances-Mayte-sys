import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function TarjetaNota({ item, iniciarEdicion, confirmarEliminacion }) {
  return (
    <View style={styles.tarjeta}>
      <View style={styles.infoNota}>
        <Text style={styles.textoTitulo}>{item.titulo}</Text>
        
        {item.subtitulo ? <Text style={styles.textoSubtitulo}>{item.subtitulo}</Text> : null}
        
        <Text style={styles.textoCuerpo}>{item.texto}</Text>
      </View>
      
      <View style={styles.accionesBotones}>
        <TouchableOpacity style={styles.botonEditar} onPress={() => iniciarEdicion(item)}>
          <Text style={styles.textoEditar}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonEliminar} onPress={() => confirmarEliminacion(item.id, item.titulo)}>
          <Text style={styles.textoEliminar}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tarjeta: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 12, borderLeftWidth: 6, borderLeftColor: '#3b82f6', elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  infoNota: { flex: 1, paddingRight: 10 },
  textoTitulo: { fontSize: 18, color: '#1f2937', fontWeight: 'bold', marginBottom: 2 },
  textoSubtitulo: { fontSize: 14, color: '#6b7280', fontStyle: 'italic', marginBottom: 5 },
  textoCuerpo: { fontSize: 14, color: '#4b5563', marginTop: 5 },
  accionesBotones: { alignItems: 'flex-end', justifyContent: 'center' },
  botonEditar: { backgroundColor: '#eff6ff', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 5, marginBottom: 8, borderWidth: 1, borderColor: '#bfdbfe' },
  textoEditar: { color: '#3b82f6', fontWeight: 'bold', fontSize: 12 },
  botonEliminar: { backgroundColor: '#fef2f2', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 5, borderWidth: 1, borderColor: '#fecaca' },
  textoEliminar: { color: '#ef4444', fontWeight: 'bold', fontSize: 12 },
});