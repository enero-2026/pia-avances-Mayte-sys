import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';

import { useArchivos } from '../../hooks/useArchivos';
import TarjetaArchivo from '../../components/archivos/TarjetaArchivo';

export default function ArchivosScreen() {
  const {
    elementosActuales, carpetaActualId, carpetaActualNombre, // Recibimos el nombre aquí
    modalCarpetaVisible, setModalCarpetaVisible,
    nombreNuevaCarpeta, setNombreNuevaCarpeta,
    agregarArchivo, crearCarpeta, entrarCarpeta, volverCarpeta,
    abrirArchivo, confirmarEliminacion
  } = useArchivos();

  return (
    <View style={styles.contenedor}>
      
      <View style={styles.header}>
        <Text style={styles.tituloHeader} numberOfLines={1}>
          {carpetaActualNombre ? carpetaActualNombre : 'Mi Biblioteca'}
        </Text>
        {carpetaActualId && (
          <TouchableOpacity style={styles.botonVolver} onPress={volverCarpeta}>
            <Text style={styles.textoVolver}>⬅ Volver</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={elementosActuales}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TarjetaArchivo 
            item={item} 
            entrarCarpeta={entrarCarpeta}
            abrirArchivo={abrirArchivo} 
            confirmarEliminacion={confirmarEliminacion} 
          />
        )}
        ListEmptyComponent={<Text style={styles.textoVacio}>Esta carpeta está vacía.</Text>}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }} 
      />

      <View style={styles.zonaBotonesInferior}>
        <TouchableOpacity style={[styles.botonInferior, { backgroundColor: '#eab308' }]} onPress={() => setModalCarpetaVisible(true)}>
          <Text style={styles.textoBotonInferior}>+ Carpeta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.botonInferior, { backgroundColor: '#8b5cf6' }]} onPress={agregarArchivo}>
          <Text style={styles.textoBotonInferior}>+ Archivo</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalCarpetaVisible} animationType="fade" transparent={true}>
        <View style={styles.fondoOscuro}>
          <View style={styles.cajaModal}>
            <Text style={styles.tituloModal}>Nueva Carpeta</Text>
            <TextInput 
              style={styles.inputModal} 
              placeholder="Nombre de la carpeta..." 
              value={nombreNuevaCarpeta} 
              onChangeText={setNombreNuevaCarpeta} 
              autoFocus
            />
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity style={styles.botonCancelarModal} onPress={() => setModalCarpetaVisible(false)}>
                <Text style={styles.textoCancelarModal}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botonAceptarModal} onPress={crearCarpeta}>
                <Text style={styles.textoAceptarModal}>Crear</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#f4f4f5', paddingTop: 50, paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  tituloHeader: { flex: 1, fontSize: 24, fontWeight: 'bold', color: '#333', marginRight: 10 },
  botonVolver: { backgroundColor: '#e5e7eb', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  textoVolver: { fontWeight: 'bold', color: '#4b5563' },
  textoVacio: { textAlign: 'center', color: '#888', marginTop: 40, fontSize: 16 },
  
  zonaBotonesInferior: { position: 'absolute', bottom: 20, left: 20, right: 20, flexDirection: 'row', justifyContent: 'space-between' },
  botonInferior: { flex: 1, paddingVertical: 15, borderRadius: 10, alignItems: 'center', marginHorizontal: 5, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2 },
  textoBotonInferior: { color: 'white', fontWeight: 'bold', fontSize: 16 },

  fondoOscuro: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
  cajaModal: { backgroundColor: '#fff', padding: 20, borderRadius: 15, elevation: 5 },
  tituloModal: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  inputModal: { backgroundColor: '#f9fafb', borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, padding: 15, marginBottom: 20 },
  botonCancelarModal: { flex: 1, padding: 12, marginRight: 5, backgroundColor: '#f3f4f6', borderRadius: 8, alignItems: 'center' },
  textoCancelarModal: { color: '#ef4444', fontWeight: 'bold' },
  botonAceptarModal: { flex: 1, padding: 12, marginLeft: 5, backgroundColor: '#eab308', borderRadius: 8, alignItems: 'center' },
  textoAceptarModal: { color: 'white', fontWeight: 'bold' },
});