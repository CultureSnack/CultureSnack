// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
// import { theme } from '../../utils/theme';

// const { width: screenWidth } = Dimensions.get('window');

// const ControlButtons = ({ isListening, loading, handleMicPress, handleKeyboardPress, showInput }) => {
//   return (
//     <>
//       {!showInput && (
//         <Text style={styles.inputPrompt}>말하거나 입력도 가능해요</Text>
//       )}

//       <TouchableOpacity
//         style={[styles.micButton, isListening && styles.micButtonActive]}
//         onPress={handleMicPress}
//         disabled={loading}
//       >
//         <Image
//                   source={require('../../assets/audio.png')}
//                   style={styles.micImage}
//                 />
//         <View style={styles.micButtonInner}>
//           <View style={[styles.micIcon, isListening && styles.micIconActive]}>
//             <View style={styles.micCore} />
//             <View style={styles.micBase} />
//             {isListening && (
//               <View style={styles.micWave}>
//                 <View style={[styles.wave, styles.wave1]} />
//                 <View style={[styles.wave, styles.wave2]} />
//                 <View style={[styles.wave, styles.wave3]} />
//               </View>
//             )}
//           </View>
//         </View>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.keyboardButton} onPress={handleKeyboardPress}>
//         <View style={styles.keyboardIcon}>
//           <View style={styles.keyboardRow}>
//             <View style={styles.key} />
//             <View style={styles.key} />
//             <View style={styles.key} />
//             <View style={styles.key} />
//           </View>
//           <View style={styles.keyboardRow}>
//             <View style={styles.key} />
//             <View style={styles.key} />
//             <View style={styles.key} />
//           </View>
//           <View style={styles.keyboardRow}>
//             <View style={[styles.key, styles.spaceKey]} />
//           </View>
//         </View>
//         <Text style={styles.keyboardLabel}>입력</Text>
//       </TouchableOpacity>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   micButton: {
//     width: 70,
//     height: 70,
//     left: '50%',
//     marginLeft: -35,
//     top: 630,
//     borderRadius: 35,
//     justifyContent: 'center',
//     alignItems: 'center',
    
//   },
//   micImage: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     top: 10,
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//   },
//   micButtonActive: {
//     shadowOpacity: 0.6,
//     shadowRadius: 12,
//     elevation: 12,
//     transform: [{ scale: 1.05 }],
//   },
//   micButtonInner: {
//     width: '100%',
//     height: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   micIcon: {
//     width: 30,
//     height: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'relative',
//   },
//   micIconActive: {
//     transform: [{ scale: 1.2 }],
//   },
//   micCore: {
//     width: 16,
//     height: 24,
//     backgroundColor: theme.colors.background,
//     borderRadius: 8,
//     position: 'absolute',
//     top: 0,
//   },
//   micBase: {
//     width: 24,
//     height: 6,
//     backgroundColor: theme.colors.background,
//     borderRadius: 3,
//     position: 'absolute',
//     bottom: 0,
//   },
//   micWave: {
//     position: 'absolute',
//     width: 60,
//     height: 60,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   wave: {
//     position: 'absolute',
//     borderWidth: 1.5,
//     borderColor: 'rgba(218, 165, 32, 0.4)',
//     borderRadius: 30,
//   },
//   wave1: { width: 50, height: 50, borderColor: 'rgba(218, 165, 32, 0.6)' },
//   wave2: { width: 40, height: 40, borderColor: 'rgba(218, 165, 32, 0.5)' },
//   wave3: { width: 30, height: 30, borderColor: 'rgba(218, 165, 32, 0.4)' },
//   keyboardButton: {
//     position: 'absolute',
//     width: 40,
//     height: 50,
//     left: 330,
//     top: 700,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   keyboardIcon: {
//     width: 24,
//     height: 18,
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 3,
//   },
//   keyboardRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     width: '100%',
//     marginBottom: 1,
//   },
//   key: {
//     width: 4,
//     height: 3,
//     backgroundColor: theme.colors.primary,
//     borderRadius: 1,
//   },
//   spaceKey: {
//     width: 16,
//     height: 3,
//   },
//   keyboardLabel: {
//     fontSize: 8,
//     fontFamily: theme.fonts.regular,
//     color: theme.colors.primary,
//     textAlign: 'center',
//     marginTop: 2,
//   },
//   inputPrompt: {
//     position: 'absolute',
//     width: 200,
//     left: '50%',
//     marginLeft: -100,
//     top: 580,
//     fontSize: 12,
//     fontFamily: theme.fonts.regular,
//     color: '#F7E7CE',
//     textAlign: 'center',
//   },
// });

// export default ControlButtons;
