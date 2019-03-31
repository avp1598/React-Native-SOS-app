import React, { Component } from 'react';
import { Text, View, FlatList, ScrollView } from 'react-native';
import { Card} from 'react-native-elements';


export default class Profile extends Component{
    
    render(){
        return(
            <View>
                <Card title = "Profile">
                    <Text>Hello {this.props.navigation.getParam('name')}</Text>
                </Card>
            </View>
        )
    }
}
