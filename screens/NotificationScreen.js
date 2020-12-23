import React, {Component} from 'react'
import {View, Text} from 'react-native'
import { ListItem } from 'react-native-elements'
import SwipeableFlatlist from '../components/SwipeableFlatlist'

export default class NotificationScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            userId: firebase.auth.currentUser.email,
            allNotifications: []
        }
    }

    getNotifications=()=>{
        this.requestRef=db.collection("all_donations").where("notification_status", "==", "unread")
        .where("targeted_user_id", "==", this.state.userId)
        .onSnapshot((snapshot)=>{
            var allNotification = []
            snapshot.docs.map((doc)=>{
                var notification = doc.data()
                notification["doc_id"]=doc.id()
                allNotification.push(notification)
            })
            this.setState({
                allNotification: allNotification
            })
        })
    }

    componentDidMount(){
        this.getNotifications();
    }

    componentWillUnmount(){
        this.notificationRef()
    }

    keyExtractor=(item, index)=>index.toString()
    renderItem=({item, i})=>{
        <ListItem
        key={i}
        itle={item.book_name}
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
            <View style={styles.container}> 
            <View style={{flex:0.1}}> 
            <MyHeader title={"Notifications"} navigation={this.props.navigation}/> 
            </View> 
            <View style={{flex:0.9}}> { this.state.allNotifications.length === 0 ?( 
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}> 
            <Text style={{fontSize:25}}>You have no notifications
            </Text> 
            </View> ) :( 
            <SwipeableFlatlist allNotifications={this.state.allNotifications}/> ) } 
            </View> 
            </View>
        )
    }
}