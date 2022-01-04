import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, StyleSheet, StatusBar, View, ScrollView, Image, ImageBackground, RefreshControl, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from "react-redux"
import { getListMovieAction, getListTVAction } from "../../redux/actions/movieAction"
import { AppStyles, BaseUrlImage, DETAIL, LIST_MOVIE, placeholder } from '../../config'
import LinearGradient from 'react-native-linear-gradient'
import { hp, wp } from '../../utils/Responsive'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { Section } from '../../components'

const { color, fontSize } = AppStyles

const Home = (props) => {
    const dispatch = useDispatch()
    const { movieList, tvList } = useSelector(state => state.movie)
    const [activeSlide, setActiveSlide] = useState(0)

    const fetchData = () => {
        dispatch(getListMovieAction({ page: 1 }))
        dispatch(getListTVAction({ page: 1 }))
    }

    useEffect(() => { fetchData() }, [])

    const renderCarousel = ({ item }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => props.navigation.navigate(DETAIL, { data: item })}>
                <ImageBackground source={{ uri: `${BaseUrlImage}${item?.poster_path}` || placeholder }} style={{ height: hp(35) }} >
                    <LinearGradient
                        style={styles.poster2}
                        colors={['rgba(255, 255, 255, 0)', 'rgba(0, 0, 0, 0.6)']}
                    >
                        <View>
                            <Text numberOfLines={1} style={styles.genre()}>Fantasy</Text>
                        </View>
                        <Text numberOfLines={1} style={styles.title2()}>{item.title}</Text>
                        <View style={{ height: '33%' }}>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => props.navigation.navigate(DETAIL, { data: item })}
                                style={styles.btnWatch()}>
                                <Text style={styles.watch()}>Watch Now</Text>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                </ImageBackground>
            </TouchableOpacity>
        );
    }

    return (
        <SafeAreaView style={styles.container()}>
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
                <View style={{ marginBottom: hp(1) }}>
                    <Carousel
                        data={movieList.slice(0, 3)}
                        renderItem={renderCarousel}
                        sliderWidth={wp(100)}
                        itemWidth={wp(100)}
                        loop
                        onSnapToItem={setActiveSlide}
                        autoplay
                        autoplayDelay={5}
                    />
                    <Pagination
                        dotsLength={3}
                        activeDotIndex={activeSlide}
                        dotStyle={{
                            width: 11.5,
                            height: 11.5,
                            borderRadius: 6,
                            backgroundColor: color.light,
                            marginHorizontal: -1
                        }}
                        inactiveDotOpacity={0.6}
                        inactiveDotScale={1}
                        containerStyle={styles.page}
                    />
                </View>
                <Section
                    title="New Release"
                    data={movieList.slice(0, 5)}
                    onPress={() => props.navigation.navigate(LIST_MOVIE, { type: 'new' })}
                    onPressItem={(item) => props.navigation.navigate(DETAIL, { data: item })}
                />
                <Section
                    title="TV Show"
                    data={tvList.slice(0, 5)}
                    style={{ marginBottom: hp(3) }}
                    onPress={() => props.navigation.navigate(LIST_MOVIE, { type: '' })}
                    onPressItem={(item) => props.navigation.navigate(DETAIL, { data: item })}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export { Home }

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
    slide: () => ({
        height: hp(35)
    }),
    poster: {
        width: wp(41.5),
        height: wp(63),
        borderRadius: hp(0.3)
    },
    poster2: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        paddingHorizontal: wp(4.5)
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
    title2: () => ({
        color: color.light,
        fontSize: fontSize.semiLarge,
        fontWeight: 'bold',
        marginBottom: hp(2)
    }),
    btnWatch: () => ({
        borderWidth: 2,
        borderColor: 'yellow',
        position: 'absolute',
        top: 0,
        paddingVertical: wp(3.5),
        paddingHorizontal: wp(5.5),
        borderRadius: wp(10)
    }),
    watch: () => ({
        color: 'yellow',
        fontSize: fontSize.semiMedium,
        fontWeight: 'bold'
    }),
    page: {
        position: 'absolute',
        bottom: -5,
        alignSelf: 'center'
    }
})