import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground, Image, TextInput } from 'react-native';
import { RectButton } from 'react-native-gesture-handler'
import { FontAwesome5 as Fa } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const fundoLogin = require('../../assets/fundoLogin.jpg')
const logo = require('../../../assets/icon.png')

const CadastrarUsuario = () => {
	const navigation = useNavigation()

	function handleNavigateBack() {
		navigation.goBack()
	}

	return (
		<View style={styles.container}>
			<ImageBackground source={fundoLogin} style={styles.fundoLogin}>
				<Image source={logo} style={styles.imgLogo} />

				<TouchableOpacity onPress={handleNavigateBack} style={styles.btnVoltar}>
					<Fa name="arrow-circle-left" color="#fff" size={32} />
				</TouchableOpacity>

				<View style={styles.containerInputs}>
					<Text style={styles.txtInput}>Nome:</Text>
					<TextInput style={styles.input} placeholder="Digite seu nome" />
				</View>

				<View style={styles.containerInputs}>
					<Text style={styles.txtInput}>E-mail:</Text>
					<TextInput style={styles.input} placeholder="Digite seu e-mail" />
				</View>

				<RectButton style={styles.botao}>
					<Text style={styles.txtBotao}>Cadastrar-se</Text>
				</RectButton>
			</ImageBackground>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},

	fundoLogin: {
		alignItems: 'center',
		flex: 1
	},

	btnVoltar: {
		left: 16,
		position: 'absolute',
		top: 16
	},

	imgLogo: {
		height: 112,
		resizeMode: 'contain',
		top: 48,
		width: 112
	},

	containerInputs: {
		marginBottom: 16,
		top: 120,
		width: 280
	},

	txtInput: {
		color: '#fff',
		fontSize: 14,
		left: 4,
		marginBottom: 4
	},

	input: {
		backgroundColor: '#fff',
		borderRadius: 8,
		color: '#000',
		fontSize: 18,
		height: 50,
		paddingLeft: 15
	},

	botao: {
		backgroundColor: '#e41e25',
		borderRadius: 8,
		height: 50,
		justifyContent: 'center',
		paddingHorizontal: 24,
		top: 200
	},

	txtBotao: {
		color: '#fff',
		fontSize: 24,
		top: -2
	}
})

export default CadastrarUsuario