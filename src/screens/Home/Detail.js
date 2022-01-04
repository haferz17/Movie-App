import React, { useEffect } from 'react'
import { SafeAreaView, Text, StyleSheet, StatusBar, View, ScrollView, ImageBackground, RefreshControl, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from "react-redux"
import { getSimilarAction } from "../../redux/actions/movieAction"
import { AppStyles, BaseUrlImage, DETAIL, placeholder, LIST_MOVIE } from '../../config'
import { Icon } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import { hp, wp } from '../../utils/Responsive'
import { Section } from '../../components'

const { color, fontSize } = AppStyles

const Detail = (props) => {
    const dispatch = useDispatch()
    const { similarList } = useSelector(state => state.movie)
    const { data } = props.route.params

    const fetchData = () => {
        dispatch(getSimilarAction(data?.id))
    }

    useEffect(() => { fetchData() }, [])

    const renderStar = (val) => {
        let count = []
        for (let a = 0; a < val; a++) count.push(a)
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {count.map(() => <Icon name="star" type="ionicon" color={color.light} size={14} style={{ marginRight: wp(1) }} />)}
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container()}>
            <StatusBar backgroundColor="transparent" translucent />
            <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                style={styles.back}>
                <Icon name="chevron-back" type="ionicon" color={color.light} size={25} />
            </TouchableOpacity>
            <ScrollView
                style={styles.mainContent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={fetchData}
                    />
                }>
                <ImageBackground source={{ uri: `${BaseUrlImage}${data?.poster_path}` || placeholder }} style={{ height: hp(35) }} >
                    <LinearGradient
                        style={styles.poster}
                        colors={['rgba(255, 255, 255, 0)', 'rgba(0, 0, 0, 0.6)']}
                    >
                        <View>
                            <Text numberOfLines={1} style={styles.genre()}>Fantasy</Text>
                        </View>
                        <View style={styles.row}>
                            {renderStar(5)}
                            <Text style={{ color: color.light }}>
                                • Release Year :
                                {data?.release_date ?
                                    data?.release_date.slice(0, 4) : data?.first_air_date ?
                                        data?.first_air_date.slice(0, 4) : '-'}
                            </Text>
                        </View>
                        <Text numberOfLines={1} style={styles.title()}>{data?.title || data?.name}</Text>
                    </LinearGradient>
                </ImageBackground>
                <View style={{ paddingHorizontal: wp(4.5), paddingTop: hp(2.5) }}>
                    <Text style={styles.titleSection()}>Synopsis</Text>
                    <Text style={styles.synopsis()}>{data?.overview || 'No Synopsis'}</Text>
                    <View style={styles.row2}>
                        <Text numberOfLines={1} style={styles.cast()}>Cast :
                            <Text style={styles.cast2()}> Gal Gadot, Kristen Wiig, Chris Pine</Text>
                        </Text>
                        <TouchableOpacity>
                            <Text style={styles.cast2('more')}>, more</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.epsContainer()}>
                    <Text style={styles.titleSection()}>Episodes</Text>
                    <View style={styles.row3}>
                        <TouchableOpacity activeOpacity={0.5} style={{ width: '35%' }}>
                            <ImageBackground source={{ uri: `${BaseUrlImage}${data?.poster_path}` || placeholder }} style={styles.imgEps}>
                                <Icon name="play" type="ionicon" color={color.light} size={22} containerStyle={styles.iconPlay} />
                            </ImageBackground>
                        </TouchableOpacity>
                        <View style={{ height: '100%', width: '62%' }}>
                            <TouchableOpacity activeOpacity={0.5}>
                                <Text numberOfLines={1} style={styles.cast2()}>1 - {data?.title || data?.name}</Text>
                            </TouchableOpacity>
                            <Text style={{ color: color.light, marginVertical: hp(0.7) }}>2h 30m</Text>
                            <Text numberOfLines={2} style={{ color: color.light }}>{data?.overview}</Text>
                        </View>
                    </View>
                </View>
                <Section
                    title="You Might Also Like This"
                    data={similarList.slice(0, 5)}
                    onPress={() => props.navigation.navigate(LIST_MOVIE, { type: 'similar' })}
                    onPressItem={(item) => props.navigation.replace(DETAIL, { data: item })}
                    style={{ marginBottom: hp(3) }}
                />
            </ScrollView>
        </SafeAreaView >
    );
};

export { Detail }

const styles = StyleSheet.create({
    container: () => ({
        flex: 1,
        backgroundColor: color.black,
    }),
    mainContent: {
        backgroundColor: color.black,
        marginTop: StatusBar.currentHeight,
        paddingBottom: hp(10)
    },
    titleSection: (x) => ({
        color: x ? 'yellow' : color.light,
        marginRight: x ? wp(2) : 0,
        fontSize: x ? fontSize.extraSmall : fontSize.extraMedium,
        fontWeight: 'bold'
    }),
    slide: () => ({
        height: hp(35)
    }),
    poster: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        paddingHorizontal: wp(4.5)
    },
    back: {
        position: 'absolute',
        top: hp(7),
        left: wp(3),
        paddingVertical: wp(1),
        paddingHorizontal: wp(1.3),
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: wp(5),
        zIndex: 1
    },
    genre: () => ({
        color: color.primary,
        fontWeight: 'bold',
        marginBottom: hp(1),
        backgroundColor: 'rgba(15,239,253,0.15)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        position: 'absolute',
        bottom: 0
    }),
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: hp(0.8)
    },
    title: () => ({
        color: color.light,
        fontSize: fontSize.semiLarge,
        fontWeight: 'bold',
        marginBottom: hp(2)
    }),
    synopsis: () => ({
        color: 'white',
        fontSize: fontSize.extraSmall,
        paddingVertical: wp(4.5),
        paddingHorizontal: wp(5),
        backgroundColor: 'gray',
        marginTop: hp(2)
    }),
    row2: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: hp(2.5)
    },
    cast: () => ({
        color: 'white',
        fontSize: fontSize.semiMedium - 0.5,
        maxWidth: '88%'
    }),
    cast2: (more) => ({
        color: more ? 'yellow' : 'white',
        fontSize: fontSize.semiMedium - 0.5,
        fontWeight: 'bold'
    }),
    epsContainer: () => ({
        paddingHorizontal: wp(4.5),
        paddingTop: hp(1.5),
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'gray'
    }),
    row3: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: hp(2)
    },
    imgEps: {
        height: hp(9),
        width: '100%',
        justifyContent: 'center'
    },
    iconPlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.55)',
        position: 'absolute',
        alignSelf: 'center',
        padding: wp(3),
        borderRadius: wp(5)
    },
})