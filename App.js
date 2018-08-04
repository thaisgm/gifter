import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ListView,
  Alert,
  Button,
  Image
} from 'react-native';
import { createStackNavigator } from 'react-navigation';

//Screens
class HomeScreen extends React.Component {
  constructor(props){
    super(props);
  }
  static navigationOptions = {
    title: 'Home'
  };
  press() {
    this.props.navigation.navigate('List');
  }
  render() {
    return (
      <View style={styles.container}>
        <Image style = {{width: 200, height: 150}} source={require('./pictures/gift.png')}/>
        <TouchableOpacity onPress = {() => this.press()}><Text style={styles.title}>GIFTER</Text></TouchableOpacity>
      </View>
    )
  }
}

class ListScreen extends React.Component {
  constructor(props){
    super(props);
  }
  static navigationOptions = {
    title: 'List'
  };

  joke(){
    this.props.navigation.navigate('jokePage');
  };

  flirt(){
    this.props.navigation.navigate('flirtPage');
  };

  roast(){
    this.props.navigation.navigate('roastPage');
  };

  fortune(){
    this.props.navigation.navigate('fortunePage');
  }

  compliment(){
    this.props.navigation.navigate('complimentPage');
  }

  mike(){
    this.props.navigation.navigate('mikePage');
  }

  render() {
    return (
      <View style = {{flexDirection: 'row', flex: 2}}>
        <View style = {{flexDirection: 'column', flex: 3}}>
          <View style = {{flex: 1, backgroundColor: 'rgb(255, 249, 125), hsl(38, 240, 179)', justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress = {() => this.joke()}>
              <Image style = {{width: 60, height: 80, marginLeft: 10}}source={require('./pictures/joke.png')}/>
              <Text style = {styles.listItem}>Joke</Text>
            </TouchableOpacity>
          </View>
          <View style = {{flex: 1, backgroundColor: 'rgb(255, 174, 201), hsl(227, 240, 202)', justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress = {() => this.flirt()}>
              <Image style = {{width: 80, height: 100}} source={require('./pictures/flirt.png')}/>
              <Text style = {styles.listItem}>Flirt</Text>
            </TouchableOpacity>
          </View>
          <View style = {{flex: 1, backgroundColor: 'rgb(205, 186, 244), hsb(260, 24, 96)', justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress = {() => this.mike()}>
              <Image style = {{width: 90, height: 110, marginLeft: 30}} source={require('./pictures/mikecartoon.png')}/>
              <Text style = {styles.listItem}>Mike-ism</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style = {{flexDirection: 'column', flex: 3, justifyContent: 'center'}}>
          <View style = {{flex: 1, backgroundColor: 'rgb(180, 241, 163), hsl(107, 32, 95)', justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress = {() => this.fortune()}>
              <Image style = {{width: 60, height: 80, marginLeft: 33}} source={require('./pictures/fortunecookie.png')}/>
              <Text style = {styles.listItem}>Fortune</Text>
            </TouchableOpacity>
          </View>
          <View style = {{flex: 1, backgroundColor: 'rgb(172, 199, 232), hsl(213, 26, 91)', justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress = {() => this.compliment()}>
              <Image style = {{width: 180, height: 120, marginLeft: 8}} source={require('./pictures/hotchocolate.png')}/>
              <Text style = {styles.listItem}>Fuzzies</Text>
            </TouchableOpacity>
          </View>
          <View style = {{flex: 1, backgroundColor: 'rgb(243, 112, 100), hsl(5, 59, 95)', justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress = {() => this.roast()}>
              <Image style = {{width: 80, height: 110, marginLeft: 5}} source={require('./pictures/dropmic.png')}/>
              <Text style = {styles.listItem}>Roast</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

class JokeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      phone: "",
      name: "World's Best Comedian",
      messages: [
        "Why don’t scientist trust atoms? Because they make up everything.",
        "Where are average things manufactured? The satisfactory",
        "What did the left eye say to the right eye? Between you and me something smells.",
        "What do you call a fake noodle? An impasta.",
        "What did one hat said to the other? You wait here I’ll go on a head."
      ]
    }
  }

  sendMessage(){
    var name = this.state.name;
    var phone = this.state.phone;
    var message = this.state.messages[Math.floor(Math.random()*this.state.messages.length)];

    if (message.includes('@')){
      var i = 0;
      var firstArr= "";
      while(message[i]!= '@' && i<message.length){
        firstArr+=message[i];
        i++;
      }

      var arr= "";
      for (var j = i+1; j < message.length; j++){
        arr+= message[j];
      }

      var newArr= name + arr;
      message= firstArr + newArr;
    }

    fetch('http://localhost:1337/sendMessage', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        phone,
        message
      })
    })
    .then((response) => {
      alert('Your giggles are on the way!');
      this.props.navigation.navigate('List');
    })
    .catch((err) => {
      console.log('Catch Error', err)
    });
  }

  render(){
    return(
      <View style = {{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', backgroundColor: 'rgb(255, 249, 125), hsl(38, 240, 179)'}}>
        <Image style = {{width: 60, height: 80, marginLeft: 10}}source={require('./pictures/joke.png')}/>
      <TextInput
          style={styles.textInput}
          onChangeText={(name) => this.setState({name})}
          placeholder = "World's Best Comedian"
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(phone) => this.setState({phone})}
          placeholder = "Type your friend's number"
        />
        <TouchableOpacity style = {styles.sendBtn} onPress = {() => this.sendMessage()}>
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

class FlirtScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      phone: "",
      name: "Secret Admirer",
      messages: [
        "Winnie the Pooh would have left Christopher Robin for you",
        "Daddy long legs.",
        "Did you invent fire cause ur fire."
      ]
    }
  }

  sendMessage(){
    var name = this.state.name;
    var phone = this.state.phone;
    var message = this.state.messages[Math.floor(Math.random()*this.state.messages.length)];

    if (message.includes('@')){
      var i = 0;
      var firstArr= "";
      while(message[i]!= '@' && i<message.length){
        firstArr+=message[i];
        i++;
      }

      var arr= "";
      for (var j = i+1; j < message.length; j++){
        arr+= message[j];
      }

      var newArr= name + arr;
      message= firstArr + newArr;
    }

    fetch('http://localhost:1337/sendMessage', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        phone,
        message
      })
    })
    .then((response) => {
      alert('Just sent! XOXO');
      this.props.navigation.navigate('List');
    })
    .catch((err) => {
      console.log('Catch Error', err)
    });
  }

  render(){
    return(
      <View style = {{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', backgroundColor: 'rgb(255, 174, 201), hsl(227, 240, 202)'}}>
        <Image style = {{width: 80, height: 100}} source={require('./pictures/flirt.png')}/>
      <TextInput
          style={styles.textInput}
          onChangeText={(name) => this.setState({name})}
          placeholder = "Secret Admirer"
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(phone) => this.setState({phone})}
          placeholder = "Type your friend's number"
        />
        <TouchableOpacity style = {styles.sendBtn} onPress = {() => this.sendMessage()}>
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

class RoastScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      phone: "",
      name: "Yo mama",
      messages: [
        "If laughter is the best medicine, your face must be curing the world.",
        "The only genuine human connection in your life is from someone who uses an app to send you meaningless dialogue.",
        "Someday you’ll go far… and I hope you stay there.",
        "You’re not stupid; you just have bad luck when thinking.",
        "Whatever kind of look you were going for, you missed."
      ]
    }
  }

  sendMessage(){
    var name = this.state.name;
    var phone = this.state.phone;
    var message = this.state.messages[Math.floor(Math.random()*this.state.messages.length)];

    if (message.includes('@')){
      var i = 0;
      var firstArr= "";
      while(message[i]!= '@' && i<message.length){
        firstArr+=message[i];
        i++;
      }

      var arr= "";
      for (var j = i+1; j < message.length; j++){
        arr+= message[j];
      }

      var newArr= name + arr;
      message= firstArr + newArr;
    }

    fetch('http://localhost:1337/sendMessage', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        phone,
        message
      })
    })
    .then((response) => {
      alert('BOOM! roasted.');
      this.props.navigation.navigate('List');
    })
    .catch((err) => {
      console.log('Catch Error', err)
    });
  }

  render(){
    return(
      <View style = {{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', backgroundColor: 'rgb(243, 112, 100), hsl(5, 59, 95)'}}>
        <Image style = {{width: 60, height: 80, marginLeft: 10}} source={require('./pictures/dropmic.png')}/>
      <TextInput
          style={styles.textInput}
          onChangeText={(name) => this.setState({name})}
          placeholder = "Yo mama"
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(phone) => this.setState({phone})}
          placeholder = "Type your friend's number"
        />
        <TouchableOpacity style = {styles.sendBtn} onPress = {() => this.sendMessage()}>
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

class FortuneScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      phone: "",
      name: "Psychic",
      messages: [
        "Time for tacos. Now. Go. Run. Ask @ to join.",
        "You must buy a cow for @.",
        "There’s still hope for you, but only if you flee to spain and open a cheese shop with your friend @.",
        "Your mailman is hiding a letter from you, you must retrieve it.",
        "You are destined for great things but will always live under the shadow of your friend @.",
        "Do not drink almond milk.",
        "Look behind you, you are one linkedin connection from your dream job. Go network.",
        "You are half mermaid.",
        "Replace your toothpaste with strawberry gogurt for good fortune.",
        "You could profit from investing in the corn industry.",
        "If you can’t win em over with kindness, start spitting your funky fresh rhymes.",
        "Nicki minaj will be contacting you soon",
        "Follow your dreams until 6:02 pm September 4th, 2036. Then give up to run a bunny farm with your friend @ in northern yugoslavia.",
        "You have a hidden talent in finger painting. Act on it.",
        "You will have two children, one will grow to be an aggressive flat-earther and the other will love cinnamon buns.",
        "It’s time to get rid of the evidence.",
        "The pope will grow to be your worst enemy. You were warned.",
        "You may not see potential in bitcoin, but bitcoin sees potential in you."
      ]
    }
  }

  sendMessage(){
    var name = this.state.name;
    var phone = this.state.phone;
    var message = this.state.messages[Math.floor(Math.random()*this.state.messages.length)];

    if (message.includes('@')){
      var i = 0;
      var firstArr= "";
      while(message[i]!= '@' && i<message.length){
          firstArr+=message[i];
        i++;
     }
      var arr= "";
      for (var j = i+1; j < message.length; j++){
        arr+= message[j];
      }
      var newArr= name + arr;
      message= firstArr + newArr;
    }


    fetch('http://localhost:1337/sendMessage', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        phone,
        message
      })
    })
    .then((response) => {
      alert('Future prediction was just sent from the present.');
      this.props.navigation.navigate('List');
    })
    .catch((err) => {
      console.log('Catch Error', err)
    });
  }

  render(){
    return(
      <View style = {{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', backgroundColor: 'rgb(180, 241, 163), hsl(107, 32, 95)'}}>
        <Image style = {{width: 60, height: 80, marginLeft: 10}} source={require('./pictures/fortunecookie.png')}/>
      <TextInput
          style={styles.textInput}
          onChangeText={(name) => this.setState({name})}
          placeholder = "Psychic"
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(phone) => this.setState({phone})}
          placeholder = "Type your friend's number"
        />
        <TouchableOpacity style = {styles.sendBtn} onPress = {() => this.sendMessage()}>
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

class MikeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      phone: "",
      name: "Mike",
      messages: [
        "listen to icy girl by saweetie, it’s a pretty good song.",
        "Funny how we've never seen steven spielberg and santa claus in the same room.",
        "Never eat two bowls of ginger, one is okay.",
        "Hello how was your day?",
        "One plus one is two, two plus two minus one three quick maths.",
        "If the world was round only people from the north pole would survive.",
        "Don’t be like light be like wind.",
        "Once you have more than 5 kids you are officially old school.",
        "A smile might be all someone needs.",
        "I look nice on glasses."
      ]
    }
  }

  sendMessage(){
    var name = this.state.name;
    var phone = this.state.phone;
    var message = this.state.messages[Math.floor(Math.random()*this.state.messages.length)];

    if (message.includes('@')){
      var i = 0;
      var firstArr= "";
      while(message[i]!= '@' && i<message.length){
        firstArr+=message[i];
        i++;
      }

      var arr= "";
      for (var j = i+1; j < message.length; j++){
        arr+= message[j];
      }

      var newArr= name + arr;
      message= firstArr + newArr;
    }

    fetch('http://localhost:1337/sendMessage', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        phone,
        message
      })
    })
    .then((response) => {
      alert('Message from Mike just delivered!');
      this.props.navigation.navigate('List');
    })
    .catch((err) => {
      console.log('Catch Error', err)
    });
  }

  render(){
    return(
      <View style = {{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', backgroundColor: 'rgb(205, 186, 244), hsb(260, 24, 96)'}}>
        <Image style = {{width: 90, height: 110, marginLeft: 15}} source={require('./pictures/mikecartoon.png')}/>
      <TextInput
          style={styles.textInput}
          onChangeText={(name) => this.setState({name})}
          placeholder = "Mike"
        />
        <TextInput
          style={styles.textInput}
          placeholder = "Type your friend's number"
          onChangeText={(phone) => this.setState({phone})}
        />
        <TouchableOpacity style = {styles.sendBtn} onPress = {() => this.sendMessage()}>
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

class ComplimentScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      phone: "",
      name: "Your BFF",
      messages: [
        "If I could shapeshift any terrestrial being in our spatial dimension, I'd make you my water bottle so I can hang out with you all day.",
        "I like you a lot i just wanted you to know that.",
        "I wish you were here.",
        "Hey, it's your bud @ checking in, letting you know I miss you :)",
        "A day with your company is definitely a special one.",
        "Grateful for you.",
        "If i am sending you this it means I care about you."
      ]
    }
  }

  sendMessage(){
    var name = this.state.name;
    var phone = this.state.phone;
    var message = this.state.messages[Math.floor(Math.random()*this.state.messages.length)];

    if (message.includes('@')){
      var i = 0;
      var firstArr= "";
      while(message[i]!= '@' && i<message.length){
        firstArr+=message[i];
        i++;
      }

      var arr= "";
      for (var j = i+1; j < message.length; j++){
        arr+= message[j];
      }

      var newArr= name + arr;
      message= firstArr + newArr;
    }

    fetch('http://localhost:1337/sendMessage', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        phone,
        message
      })
    })
    .then((response) => {
      alert('Just sent a message to your BFF.');
      this.props.navigation.navigate('List');
    })
    .catch((err) => {
      console.log('Catch Error', err)
    });
  }

  render(){
    return(
      <View style = {{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', backgroundColor: 'rgb(172, 199, 232), hsl(213, 26, 91)'}}>
        <Image style = {{width: 180, height: 120, marginLeft: 8}} source={require('./pictures/hotchocolate.png')}/>
      <TextInput
          style={styles.textInput}
          onChangeText={(name) => this.setState({name})}
          placeholder = "Your BFF"
        />
        <TextInput
          style={styles.textInput}
          placeholder = "Type your friend's number"
          onChangeText={(phone) => this.setState({phone})}
        />
        <TouchableOpacity style = {styles.sendBtn} onPress = {() => this.sendMessage()}>
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    )
  }
}


//Navigator
export default createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  List: {
    screen: ListScreen,
  },
  jokePage: {
    screen: JokeScreen,
  },
  flirtPage: {
    screen: FlirtScreen,
  },
  roastPage: {
    screen: RoastScreen,
  },
  fortunePage: {
    screen: FortuneScreen,
  },
  complimentPage: {
    screen: ComplimentScreen,
  },
  mikePage: {
    screen: MikeScreen,
  },
}, {initialRouteName: 'Home'});


//Styles
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontFamily: 'Courier New',
    fontSize: 50,
    textAlign: 'center',
    fontWeight: 'bold',
    display: 'flex'
  },
  listItem: {
    fontFamily: 'Courier New',
    fontSize: 30,
    marginTop: 10,
    textAlign: 'center'
  },
  textInput: {
    height: 40,
    borderColor: 'black',
    marginTop: 5,
    borderWidth: 1,
    width: 200,
    padding: 10
  },
  sendBtn: {
    marginLeft: 100,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    width: 57,
    marginTop: 30,
    padding: 10,
    backgroundColor: 'green'
  },
  image: {
    height: 50,
    width: 40,
    marginLeft: 150
  }
});
