import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function TarjetaArchivo({ item, entrarCarpeta, abrirArchivo, confirmarEliminacion }) {
  
  const esCarpeta = item.tipo === 'carpeta';
  const tamañoMB = !esCarpeta && item.tamaño ? (item.tamaño / (1024 * 1024)).toFixed(2) : null;

  return (
    <View style={[styles.tarjeta, esCarpeta ? styles.tarjetaCarpeta : styles.tarjetaDoc]}>
      <View style={styles.iconoContainer}>
        <Text style={styles.icono}>{esCarpeta ? '📁' : '📄'}</Text>
      </View>

      <View style={styles.infoArchivo}>
        <Text style={styles.textoNombre} numberOfLines={2}>{item.nombre}</Text>
        {!esCarpeta && <Text style={styles.textoTamaño}>Tamaño: {tamañoMB} MB</Text>}
      </View>
      
      <View style={styles.accionesBotones}>
        {esCarpeta ? (
          <TouchableOpacity style={styles.botonAbrir} onPress={() => entrarCarpeta(item.id)}>
            <Text style={styles.textoAbrir}>Entrar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.botonAbrir} onPress={() => abrirArchivo(item.uriLocal)}>
            <Text style={styles.textoAbrir}>Abrir</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity style={styles.botonEliminar} onPress={() => confirmarEliminacion(item)}>
          <Text style={styles.textoEliminar}>Borrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tarjeta: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 12, borderLeftWidth: 6, elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  tarjetaCarpeta: { borderLeftColor: '#eab308' }, 
  tarjetaDoc: { borderLeftColor: '#8b5cf6' },     
  iconoContainer: { marginRight: 15 },
  icono: { fontSize: 30 },
  infoArchivo: { flex: 1, paddingRight: 10 },
  textoNombre: { fontSize: 16, color: '#1f2937', fontWeight: 'bold', marginBottom: 5 },
  textoTamaño: { fontSize: 12, color: '#6b7280' },
  accionesBotones: { alignItems: 'flex-end', justifyContent: 'center' },
  botonAbrir: { backgroundColor: '#f3e8ff', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 5, marginBottom: 8, borderWidth: 1, borderColor: '#d8b4fe' },
  textoAbrir: { color: '#8b5cf6', fontWeight: 'bold', fontSize: 12 },
  botonEliminar: { backgroundColor: '#fef2f2', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 5, borderWidth: 1, borderColor: '#fecaca' },
  textoEliminar: { color: '#ef4444', fontWeight: 'bold', fontSize: 12 },
});