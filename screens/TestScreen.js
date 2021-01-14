import React from 'react';
import {ProgressBarAndroid, StyleSheet, Text, TouchableOpacity, View, TextInput} from 'react-native';
import {Toolbar} from "../components/Toolbar";
import _ from 'lodash'
import NetInfo from "@react-native-community/netinfo";
import {getData} from "../utils/Storage";

export default class TestScreen extends React.Component {
    state = {
        viewVisible: true,
        task: {
            questions: "",
            answer: []
        },
        points: 0,
        position: 0,
        duration: 100,
        bar: 1,
        barStatus: 0,
        id: this.props.route.params.id,
        title: this.props.route.params.title,
        description: '',
        text: '',
        tasks: [{
            question: "",
            answers: [
                {
                    content: "",
                    isCorrect: false
                },
                {
                    content: "",
                    isCorrect: false
                },
                {
                    content: "",
                    isCorrect: false
                },
                {
                    content: "",
                    isCorrect: false
                },
            ],
            duration: 100
        },],
        isConnected: false,
    }
    network;

    componentDidMount() {
        this.network = NetInfo.addEventListener(state => {
            this.setState({isConnected: state.isConnected})
        })

        this.getTest().then(() =>{})
        if (this.state.viewVisible) {
            //this.taskDisplay()
            this.interval = setInterval(() => this.setState((prevState) => ({
                duration: prevState.duration - 1,
                bar: prevState.bar - this.state.barStatus
            })), 1000);
        }
    }

    getTest = async() => {
        await getData(this.props.route.params.id).then(r => {
            r = JSON.parse(r)
            this.setState({
                tasks: _.shuffle(r.tasks),
                description: r.description
            })
        })
            .then(() => {
                this.taskDisplay()
            })
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentDidUpdate() {
        if (this.state.viewVisible) {
            if (this.state.duration === 0) {
                this.questionHandler(5)
                    .then(r => {
                    this.taskDisplay()
                })
            }
        }
    }

    taskDisplay = () => {
        const {tasks} = this.state
        if(this.state.viewVisible){
            this.setState({
                task: {
                    questions: tasks[this.state.position].question,
                    answer: _.shuffle(tasks[this.state.position].answers)
                },
                duration: tasks[this.state.position].duration,
                barStatus: 1 / tasks[this.state.position].duration
            })
        }
    }

    keyHandler = (key) => {
        this.questionHandler(key).then(r => {
            this.taskDisplay()
        })
    }

    questionCheck =  async (key) => {
        const {task, points, duration} = this.state
        if (duration !== 0) {
            if (task.answer[key].isCorrect) {
                this.setState({
                    points: points + 1
                })
            }
        }
    }

    questionHandler = async (key) => {
        const {position, tasks} = this.state
        if (position < tasks.length - 1) {
            await this.questionCheck(key)
            this.setState({
                position: position + 1,
                bar: 1,
                duration: 30,
            })
        } else {
            await this.questionCheck(key)
            this.setState({viewVisible: false})
        }
    }

    postResult = () => {
        const {text, points, title, tasks} = this.state
        let {navigation} = this.props;
        const data = {
            nick: text,
            score: points,
            total: tasks.length,
            type: title
        }

        fetch('http://tgryl.pl/quiz/result', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify((data))
        })
        navigation.navigate("Home")
    }

    render() {
        const {viewVisible, task, points, position, duration, bar, title, description, tasks} = this.state
        const {navigation} = this.props

        return (
            <View style={styles.container}>
                <Toolbar navigation={() => {navigation.openDrawer()}} text={title}/>
                {!this.state.isConnected && (<View style={styles.noNetwork}>
                    <Text style={styles.textNetwork}>No network</Text>
                </View>)}
                {viewVisible && <View style={{marginTop: 20, alignContent: 'center'}}>
                    <View style={styles.rowDirect}>
                        <Text style={styles.firstText}>Question {position + 1} of {tasks.length}</Text>
                        <Text style={styles.firstText}>Time: {duration} sec</Text>
                    </View>
                    <ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={bar}
                                        style={styles.progressBar}
                    />
                    <Text style={styles.questionText}>{task.questions}</Text>
                    <Text style={styles.descriptionText} numberOfLines={2}>{description}</Text>
                    <View style={styles.answersView}>
                        <View style={[styles.rowDirect, {marginVertical: 20}]}>
                            {task.answer.map((item, key) => {
                                    return (
                                        <TouchableOpacity onPress={() => this.keyHandler(key)}
                                                          style={styles.answerTouchable} key={key}><Text
                                            style={styles.answerText}>{item.content}</Text></TouchableOpacity>
                                    )
                                }
                            )}
                        </View>
                    </View>
                </View>}
                {!viewVisible && <View style={{marginTop: 160,alignItems: 'center'}}>
                    <Text style={{fontSize: 30, fontFamily: 'roboto-medium'}}>You scored {points} / {tasks.length} points </Text>
                    {this.state.isConnected && (
                        <Text style={{fontSize: 30, marginTop: 20, fontFamily: 'raleway-medium'}}>Share your result!</Text>
                    )}
                    {this.state.isConnected && (
                        <TextInput  style={{height: 40,backgroundColor: 'azure', fontSize: 20, marginTop: 20, fontFamily: 'raleway-medium'}}
                                    placeholder="Enter your nickname" onChangeText={(text) => this.setState({text})}/>
                    )}
                    {this.state.isConnected && (
                        <TouchableOpacity style={styles.backButton} onPress={() => this.postResult()}>
                            <Text style={{fontSize: 20, textAlign: 'center', fontFamily: 'raleway-medium'}}>Send</Text>
                        </TouchableOpacity>
                    )}
                    {!this.state.isConnected && (
                        <Text style={{fontSize: 30, marginTop: 20, fontFamily: 'raleway-medium'}}>No network</Text>
                    )}
                    {!this.state.isConnected && (
                        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Home")}>
                            <Text style={{fontSize: 20, textAlign: 'center', fontFamily: 'raleway-medium'}}>Go back</Text>
                        </TouchableOpacity>
                    )}
                </View>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    rowDirect: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: "wrap",
        alignItems: 'center'
    },
    firstText: {
        paddingHorizontal: 20,
        fontSize: 21,
        fontFamily: 'roboto-medium'
    },
    progressBar: {
        marginVertical: 5,
        marginHorizontal: 20
    },
    questionText: {
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'roboto-medium',
    },
    descriptionText: {
        textAlign: 'center',
        marginTop: 20,
        marginHorizontal: 20,
        fontSize: 12,
        fontFamily: 'raleway-medium'
    },
    answersView: {
        marginTop: 15,
        marginHorizontal: 20,
        paddingVertical: 15,
        paddingHorizontal: 20,
        justifyContent: 'space-evenly',
    },
    answerText: {
        fontSize: 13,
        textAlign: 'center',
        fontFamily: 'raleway-medium',
    },
    answerTouchable: {
        borderWidth: 1,
        margin: 10,
        backgroundColor: "lightgrey",
        borderRadius: 7,
        width: 143,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backButton: {
        backgroundColor: "lightgrey",
        borderRadius: 7,
        padding: 10,
        marginTop: 20,
        justifyContent: "center",
    },
    noNetwork: {
        backgroundColor: "#FFFF00",
        marginBottom: 10,
        alignItems: 'center',
    },
    textNetwork: {
        color: '#FF0000',
    }
});
