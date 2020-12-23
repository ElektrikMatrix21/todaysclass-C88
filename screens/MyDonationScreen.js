import React, {Component} from 'react'
import {View, Text, FlatList} from 'react-native'
import { ListItem } from 'react-native-elements'

import firebase from 'firebase'
import db from '../config'

export default class MyDonationScreen extends Component{
    static navigationOptions={header: null};
    constructor(){
        super();
        this.state={
            userId: firebase.auth().currentUser.email(),
            allDonation: []
        }
        this.requestRef=null;
    }

    getAllDonations=()=>{
        this.requestRef=db.collection('all_donations').where("donor_id", "==",  this.state.userId)
        .Snapshot((snapshot)=>{
            var all_donations = snapshot.docs.map(document=>document.data())
            this.setState({
                all_donations: all_donations
            })
        })
    }

    sendNotification=(bookDetails, request_status)=>{
        var requestId = bookDetails.request_id
        var donorId = bookDetails.donor_id
        db.collection("all_notifications").where("request_id", "==", this.state.requestId)
        .where("donor_id", "==", this.state.donorId)
        .get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                var message = ""
            })
            if(requestStatus === "Book Sent"){
                message = this.state.donorName+" sent you a book!"
            }
            else{
                message = this.state.donorName+" has shown interest in donating you a book!"
            }
            db.collection("all_notifications").doc(doc_id).update({
                "message": message,
                "notification_status": "Unread",
                "date": firebase.firestore.fieldValue.serverTimestamp()
            })
        })
    }

    sendBook=(bookDetails)=>{
        if(bookDetails.request_status === "Book Sent"){
            var requestStatus = "Donor Interested"
        }
        db.collection("all_donations").doc(bookDetails.doc_id).update({
            "request_status": "Book Sent"
        })
        this.sendNotification(bookDetails, request_status)
    }

    keyExtractor=(item, index)=>index.toString()
    renderItem=({item, i})=>{
        <ListItem 
        key={i}
        title={item.book_name}
        subtitle={"Requested By: "+item.requested_by+"/nStatus :"+item.request_status}
        leftElement={<Icon name="Book" type="font-awesome" color="#696969"/>}
        titleStyle={{color:'black', fontWeight:'bold'}}
        rightElement={<TouchableOpacity style={styles.button} onPress={()=>{
            this.sendBook(item)
        }}><Text style={{color:'#FFFF'}}>Send Book</Text></TouchableOpacity>}
        bottomDivider
        />
    }
    
    render(){
        return(
            <View style={{flex:1}}> 
                <MyHeader navigation={this.props.navigation} title="My Donations"/> 
                <View style={{flex:1}}> { this.state.allDonations.length === 0 ?( <View style={styles.subtitle}> <Text style={{ fontSize: 20}}>List of all book Donations</Text> </View> ) :( <FlatList keyExtractor={this.keyExtractor} data={this.state.allDonations} renderItem={this.renderItem} /> ) } </View> </View>
        )
    }
}