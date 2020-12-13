import React from 'react';
import {ProgressBarAndroid, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Toolbar} from "../components/Toolbar";

const tasks = [
    {
        "question": "Pytanie 1 Odpowiedz A ?",
        "answers": [
            {
                "content": "A",
                "isCorrect": true
            },
            {
                "content": "B",
                "isCorrect": false
            },
            {
                "content": "C",
                "isCorrect": false
            },
            {
                "content": "D",
                "isCorrect": false
            }
        ],
        "duration": 10
    },
    {
        "question": "Pytanie 2 Odpowiedz B ?",
        "answers": [
            {
                "content": "A",
                "isCorrect": false
            },
            {
                "content": "B",
                "isCorrect": true
            },
            {
                "content": "C",
                "isCorrect": false
            },
            {
                "content": "D",
                "isCorrect": false
            }
        ],
        "duration": 10
    },
    {
        "question": "Pytanie 3 Odpowiedz C ?",
        "answers": [
            {
                "content": "A",
                "isCorrect": false
            },
            {
                "content": "B",
                "isCorrect": false
            },
            {
                "content": "C",
                "isCorrect": true
            },
            {
                "content": "D",
                "isCorrect": false
            }
        ],
        "duration": 10
    },
    {
        "question": "Pytanie 4 Odpowiedz C ?",
        "answers": [
            {
                "content": "A",
                "isCorrect": false
            },
            {
                "content": "B",
                "isCorrect": false
            },
            {
                "content": "C",
                "isCorrect": true
            },
            {
                "content": "D",
                "isCorrect": false
            }
        ],
        "duration": 10
    },
]

export default class TestScreen extends React.Component {
    state = {
        viewVisible: true,
        task: {
            questions: "",
            answer: []
        },
        points: 0,
        position: 0,
        duration: 10,
        bar: 1,
        barStatus: 0
    }


    componentDidMount() {
        if (this.state.viewVisible) {
            this.taskDisplay()
            this.interval = setInterval(() => this.setState((prevState) => ({
                duration: prevState.duration - 1,
                bar: prevState.bar - this.state.barStatus
            })), 1000);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentDidUpdate() {
        if (this.state.viewVisible) {
            if (this.state.duration === 0) {
                this.questionHandler(1).then(r => {
                    this.taskDisplay()
                })
            }
        }
    }

    taskDisplay = () => {
        this.setState({
            task: {
                questions: tasks[this.state.position].question,
                answer: tasks[this.state.position].answers
            },
            duration: tasks[this.state.position].duration,
            barStatus: 1 / tasks[this.state.position].duration
        })
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
        const {position} = this.state
        if (position < tasks.length - 1) {
            await this.questionCheck(key)
            this.setState({
                position: position + 1,
                bar: 1,
                duration: 10
            })
        } else {
            await this.questionCheck(key)
            this.setState({viewVisible: false})
        }
    }


    render() {
        const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore " +
            "et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea " +
            "commodo consequat. Duis aute irure dolor  in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. " +
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
        const {viewVisible, task, points, position, duration, bar} = this.state
        const {navigation} = this.props

        return (
            <View style={styles.container}>
                <Toolbar navigation={() => {navigation.openDrawer()}} text={"Test #1"}/>
                {viewVisible && <View style={{alignContent: 'center'}}>
                    <View style={styles.rowDirect}>
                        <Text style={styles.firstText}>Question {position + 1} of {tasks.length}</Text>
                        <Text style={styles.firstText}>Time: {duration} sec</Text>
                    </View>
                    <ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={bar}
                                        style={styles.progressBar}
                    />
                    <Text style={styles.questionText}>{task.questions}</Text>
                    <Text style={styles.loremText} numberOfLines={2}>{lorem}</Text>
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
                {!viewVisible && <View style={{alignItems: 'center', paddingTop: 200}}>
                    <Text style={{fontSize: 30}}>Uzyskałeś {points} na {tasks.length}</Text>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Home")}>
                        <Text>Powrot do menu</Text>
                    </TouchableOpacity>
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
        fontSize: 21
    },
    progressBar: {
        margin: 20
    },
    questionText: {
        fontSize: 27,
        textAlign: 'center',
    },
    loremText: {
        marginTop: 35,
        marginHorizontal: 20,
        fontSize: 13,
    },
    answersView: {
        marginVertical: 35,
        marginHorizontal: 20,
        paddingVertical: 15,
        paddingHorizontal: 20,
        justifyContent: 'space-evenly',
        borderWidth: 2,
        backgroundColor: '#E8E8E8',
    },
    answerText: {
        fontSize: 15,
    },
    answerTouchable: {
        borderWidth: 1,
        paddingHorizontal: 40,
        paddingVertical: 12,
        marginBottom: 20,
        backgroundColor: "lightgrey",
        borderRadius: 7,
        width: 140,
        height: 50,
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
});
