import React, {Component} from 'react'
import {View, Text, Dimensions} from 'react-native'
import { database } from 'firebase'
import db from '../config'
import {SwipeListView} from 'react-native-swipe-list-view'
import {ListItem, Icon} from 'react-native-elements'

export default class SwipeableFlatlist extends Component{
    constructor(props){
        super(props);
        this.state={
            allNotifications: this.props.allNotifications

        }
    }
    
    updateMarkAsread = (notification) => {
        db.collection('all_notifications').doc(notifications.doc_id).update({"notification_status" : "read"})
        
    }

    onSwipeValueChange = (swipeData) => {
        var allNotifications = this.state.allNotifications
        const {key, value} = swipeData
        if(value<-Dimensions.get('window').width){
            const newData = [...allNotifications]
            const prevIndex = allNotifications.findIndex(item=>item.key===key)
            this.updateMarkAsread(allNotifications[prevIndex])
            newData.splice(prevIndex, 1)
            this.setState({allNotifications: newData})
        }
    }

    renderHiddenItem = () => {
        <View style={styles.rowBack}>
            <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
                <Text style={styles.backTextWhite}>
                      
                </Text>
            </View>
        </View>
    }

    renderItem = data => {
        <ListItem
        leftComponent={<Icon name="book" type="font-awesome" color="#696969"/>}
        title={data.item.book_name}
        titleStyle={{color: black, fontWeight: bold}}
        subtitle={data.item.message}
        bottomDivider
        />
    }

    render(){
        return(
            <View>
                <SwipeListView
                disableRightSwipe
                data={this.state.allNotifications}
                renderItem={this.renderItem}
                renderHiddenItem={this.renderHiddenItem}
                rightOpenValue={-Dimensions.get('window').width}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onSwipeValueChange={this.onSwipeValueChange}
                />
            </View>
        )
    }
}