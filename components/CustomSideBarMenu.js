import React, { Component} from 'react';
import {StyleSheet, View, Text,TouchableOpacity} from 'react-native';
import { DrawerItems} from 'react-navigation-drawer'
import { Avatar } from 'react-native-elements'
import firebase from 'firebase';
import * as ImagePicker from 'expo-image-picker';
import db from '../config';

export default class CustomSideBarMenu extends Component{
  state={
    userId: firebase.auth().currentUser.email,
    image: "#",
    name: "",
    docId: ""
  }

  selectPicture = async () => {
    const {cancelled, uri} = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.mediaTypeOptions.All(),
      allowEditing: true,
      aspect: [4,3],
      quality: 1
    })
    if(!cancelled){
      this.setState({
        image, uri
      })
      this.uploadImage(uri, this.state.userId)
    }
  }

  uploadImage = async (uri, imageName) => {
    var response = await fetch(uri)
    var log = await response.log()
    var ref = firebase.storage().ref().child("user_profiles/"+imageName)
    return ref.put(log).then((response)=>{
      this.fetchImage(imageName)
    })
  }

  fetchImage = (imageName) => {
    var storageRef = firebase.storage().ref().child("user_profiles/"+imageName)
    storageRef.getDownloadURL().then((url)=>{
      this.setState({
        image: uri
      })
    })
    .catch((error)=>{
      this.setState({
        image: "#"
      })
    })
  }

  componentDidMount(){
    this.fetchImage(this.state.userId)
    this.getUserProfilePicture()
  }

  getUserProfilePicture(){
    db.collection("users").where("email_id","==",this.state.userId).onSnapshot((querySnapshot)=>{
      querySnapshot.forEach((doc)=>{
        this.setState({
          name: doc.data().first_name+" "+doc.data().last_name
        })
      })
    })
  }

  render(){
    return(
      <View style={{flex:1}}>
        <View style={styles.drawerItemsContainer}>
          <View style={{flex:0.5, alignItems:'center', backgroundColor:'orange'}}>
            <Avatar
            rounded
            source={{uri:this.state.image}}
            size="medium"
            onPress={()=>this.selectPicture()}
            containerStyle={styles.imageContainer}
            showEditButton
            />
            <Text style={{fontWeight:100, fontSize:20, marginTop:10}}>
              {this.state.name}
            </Text>
          </View>
          <DrawerItems {...this.props}/>
        </View>
        <View style={styles.logOutContainer}>
          <TouchableOpacity style={styles.logOutButton}
          onPress = {() => {
              this.props.navigation.navigate('WelcomeScreen')
              firebase.auth().signOut()
          }}>
            <Text>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container : {
    flex:1
  },
  drawerItemsContainer:{
    flex:0.8
  },
  logOutContainer : {
    flex:0.2,
    justifyContent:'flex-end',
    paddingBottom:30
  },
  logOutButton : {
    height:30,
    width:'100%',
    justifyContent:'center',
    padding:10
  },
  logOutText:{
    fontSize: 30,
    fontWeight:'bold'
  }
})
