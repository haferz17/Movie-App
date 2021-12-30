import React, { useEffect } from 'react'
import { SafeAreaView, Text, StyleSheet, StatusBar, View, ScrollView, RefreshControl } from 'react-native'
// import { useDispatch, useSelector } from "react-redux"
// import { getListTodoAction, handleCheckTodoAction } from "../../redux/actions/todoAction";
import AppStyles from '../../config/style'
// import { All, Plus } from '../../config/images';
import { hp } from '../../utils/Responsive'
// import { CardCategory, FloatButton } from '../../components/atoms';
// import { SectionList } from '../../components/molecules';
// import { TODO_LIST, FORM_TODO } from '../../config/navigation';
// import { handleCheckTodoData } from '../../utils/ConstrucData';

const { color, font, fontColor, fontSize, margin } = AppStyles

const Home = (props) => {
    // const dispatch = useDispatch()
    // const { studyData, workData, isLoading } = useSelector(state => state.todo)
    // const countAllData = studyData.length + workData.length
    const fetchData = () => null
    const getGreeting = () => {
        let greeting = ""
        let time = new Date().getHours();
        if (time < 10) {
            greeting = "Good Morning :)";
        } else if (time < 20) {
            greeting = "Good Day :)";
        } else {
            greeting = "Good Evening :)";
        }
        return greeting
    }
    const handleCheckTodo = (item, id) => {
        const data = item == 'Study' ? studyData : workData
        const category = item == 'Study' ? 'studyData' : 'workData'
        const newData = handleCheckTodoData(data, id)
        dispatch(handleCheckTodoAction(newData, category))
    }
    const handleClickNext = (category) => {
        props.navigation.navigate(TODO_LIST, { category })
    }
    const handleGoToForm = (type, item = {}) => {
        props.navigation.navigate(FORM_TODO, { type, category: '', item })
    }

    useEffect(() => { fetchData() }, [])

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="transparent" translucent />
            <ScrollView
                style={styles.mainContent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={fetchData}
                    />
                }>
                <View style={styles.topContent}>
                    <Text style={styles.greeting}>Hi, {getGreeting()}</Text>
                    <Text style={styles.reminder}>Let's finish your todo !!</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.primary,
    },
    topContent: {
        alignItems: 'center',
        height: hp(20),
        justifyContent: 'center',
        backgroundColor: color.primary
    },
    greeting: {
        color: fontColor.light,
        fontSize: fontSize.extraLarge,
        fontFamily: font.bold,
        marginBottom: hp(1)
    },
    reminder: {
        color: fontColor.light,
        fontSize: fontSize.semiLarge,
        fontFamily: font.semiBold,
        textAlign: 'center'
    },
    mainContent: {
        backgroundColor: color.lightGrey,
        marginTop: StatusBar.currentHeight,
        paddingBottom: hp(10)
    },
    listContent: {
        height: '90%',
        backgroundColor: color.lightGrey,
        paddingHorizontal: margin.horizontal
    }
})