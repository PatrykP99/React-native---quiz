import React from 'react';
import {ProgressBarAndroid, StyleSheet, Text, TouchableOpacity, View, TextInput} from 'react-native';
import {Toolbar} from "../components/Toolbar";

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
        },]
    }


    componentDidMount() {

        this.setState({ isLoading: true })
        this.fetchJson()
        if (this.state.viewVisible) {
            this.taskDisplay()
            this.interval = setInterval(() => this.setState((prevState) => ({
                duration: prevState.duration - 1,
                bar: prevState.bar - this.state.barStatus
            })), 1000);
        }
    }

    fetchJson = () => {
        fetch('http://tgryl.pl/quiz/test/' + this.props.route.params.id)
            .then((response) => response.json())
            .then((json) => {
                this.state.tasks = json.tasks
                this.setState({description: json.description})})
            .then(() => this.taskDisplay())
            .catch((error) => console.error(error))
            .finally(() => {
                this.setState({ isLoading: false });
            });
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
        const {tasks} = this.state
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
            });
        navigation.navigate("Home")
    }

    render() {
        const {viewVisible, task, points, position, duration, bar, title, description, tasks} = this.state
        const {navigation} = this.props

        return (
            <View style={styles.container}>
                <Toolbar navigation={() => {navigation.openDrawer()}} text={title}/>
                {viewVisible && <View style={{alignContent: 'center'}}>
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
                {!viewVisible && <View style={{alignItems: 'center', paddingTop: 45}}>
                    <Text style={{fontSize: 30, fontFamily: 'roboto-medium'}}>You scored {points} / {tasks.length} points </Text>
                    <Text style={{fontSize: 30, marginTop: 20, fontFamily: 'raleway-medium'}}>Share your result!</Text>
                    <TextInput  style={{height: 40,backgroundColor: 'azure', fontSize: 20, marginTop: 20, fontFamily: 'raleway-medium'}}
                                placeholder="Enter your nickname" onChangeText={(text) => this.setState({text})}/>
                    <TouchableOpacity style={styles.backButton} onPress={() => this.postResult()}>
                        <Text style={{fontSize: 20, textAlign: 'center', fontFamily: 'raleway-medium'}}>Send</Text>
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
        fontSize: 21,
        fontFamily: 'roboto-medium'
    },
    progressBar: {
        margin: 20
    },
    questionText: {
        fontSize: 27,
        textAlign: 'center',
        fontFamily: 'roboto-medium',
    },
    descriptionText: {
        textAlign: 'center',
        marginTop: 35,
        marginHorizontal: 20,
        fontSize: 13,
        fontFamily: 'raleway-medium'
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
        fontSize: 12,
        textAlign: 'center',
        fontFamily: 'raleway-medium',
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
        width: 100,
        height: 50,
        borderRadius: 7,
        padding: 10,
        marginTop: 20,
        justifyContent: "center",
    },
});
