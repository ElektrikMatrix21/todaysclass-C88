import React, {Component} from 'react'
import {View, StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native'
import {ListItem} from 'react-native-elements'
import firebase from 'firebase'
import db from '../config'
import MyHeader from '../components/MyHeader'

export default class MyRecievedBooksScreen extends Component{
    constructor(){
        super();
        this.state={
            userId: firebase.auth().currentUser.email,
            recievedBooksList: []
        }
        this.requestRef=null
    }

    getRecievedBooksList = () => {
        this.requestRef = db.collection('requested_books').where("user_id", "==", this.state.userId).where("book_status", "==", "recieved")
        .onSnapshot((snapshot)=>{
            var recievedBooksList = snapshot.docs().map((doc)=>doc.data())
            this.setState({
                recievedBooksList: recievedBooksList
            })
        })
    }

    componentDidMount(){
        this.getRecievedBooksList()
    }

    componentWillUnmount(){
        this.requestRef();
    }

    keyExtractor=(item,index)=>index.toString()

    renderItem=({item, i})=>{
        return(
            <ListItem
                key={i}
                title={item.book_name}
                subtitle={item.book_status}
                titleStyle={{color:'black', fontWeight:'bold'}}
                bottomDivider
            >
            </ListItem>
        )
    }
    
}
