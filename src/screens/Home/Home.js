import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, StyleSheet, StatusBar, View, ScrollView, Image, ImageBackground, FlatList, RefreshControl, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from "react-redux"
import { getListMovieAction, getListTVAction } from "../../redux/actions/movieAction"
import { AppStyles, BaseUrlImage, DETAIL } from '../../config'
import { Icon } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import { hp, wp } from '../../utils/Responsive'
import Carousel, { Pagination } from 'react-native-snap-carousel'

const { color, font, fontColor, fontSize, margin } = AppStyles

const Home = (props) => {
    const dispatch = useDispatch()
    const { movieList, tvList } = useSelector(state => state.movie)
    const [activeSlide, setActiveSlide] = useState(0)

    const fetchData = () => {
        dispatch(getListMovieAction())
        dispatch(getListTVAction())
    }

    // useEffect(() => { fetchData() }, [])

    const renderCarousel = ({ item }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => props.navigation.navigate(DETAIL, { data: item })}>
                <ImageBackground source={{ uri: `${BaseUrlImage}${item?.poster_path}` || 'https://heduparts.com/uploads/placeholder.png' }} style={{ height: hp(35) }} >
                    <LinearGradient
                        style={{ width: '100%', height: '100%', justifyContent: 'flex-end', paddingHorizontal: wp(4.5) }}
                        colors={['rgba(255, 255, 255, 0)', 'rgba(0, 0, 0, 0.6)']}
                    >
                        <Text numberOfLines={1} style={{ color: color.primary, fontWeight: 'bold', marginBottom: hp(1) }}>Fantasy</Text>
                        <Text numberOfLines={1} style={{ color: color.light, fontSize: fontSize.semiLarge, fontWeight: 'bold', marginBottom: hp(2) }}>{item.title}</Text>
                        <View style={{ height: '33%' }}>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => props.navigation.navigate(DETAIL, { data: item })}
                                style={{ borderWidth: 2, borderColor: 'yellow', position: 'absolute', top: 0, paddingVertical: wp(3.5), paddingHorizontal: wp(5.5), borderRadius: wp(10) }}>
                                <Text style={{ color: 'yellow', fontSize: fontSize.semiMedium, fontWeight: 'bold' }}>Watch Now</Text>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                </ImageBackground>
            </TouchableOpacity>
        );
    }

    const TitleSection = ({ title = "", onPress = () => null, style, icon = "", font = "" }) => {
        return (
            <View style={[styles.content, style]}>
                <Text style={styles.titleSection()}>{title}</Text>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.titleSection('see')}>See All</Text>
                    <Icon name="chevron-forward" type="ionicon" color={'yellow'} size={22} />
                </TouchableOpacity>
            </View>
        )
    }

    const renderStar = (val) => {
        let count = []
        for (let a = 0; a < val; a++) count.push(a)
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {count.map(() => <Icon name="star" type="ionicon" color={color.light} size={14} style={{ marginRight: wp(1) }} />)}
            </View>
        )
    }

    const renderItem = ({ item, index }, type) => {
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => props.navigation.navigate(DETAIL, { data: item, type })}
                style={styles.eventItem(index)} >
                <ImageBackground source={{ uri: `${BaseUrlImage}${item?.poster_path}` || 'https://heduparts.com/uploads/placeholder.png' }} style={{ width: wp(41.5), height: wp(63), borderRadius: hp(0.3) }} >
                    <LinearGradient
                        style={{ width: '100%', height: '100%' }}
                        colors={['rgba(255, 255, 255, 0)', 'rgba(0, 0, 0, 0.5)']}
                    >
                        <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: wp(2.5), paddingHorizontal: wp(2) }}>
                            <Text numberOfLines={1} style={{ color: color.primary }}>Fantasy</Text>
                            {renderStar(5)}
                            <Text numberOfLines={2} style={{ color: color.light, fontSize: fontSize.medium - 1, fontWeight: 'bold', marginTop: hp(0.5) }}>{type ? item.name : item.title}</Text>
                        </View>
                    </LinearGradient>
                </ImageBackground>
            </TouchableOpacity>
        )
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
                        containerStyle={{ position: 'absolute', bottom: -5, alignSelf: 'center' }}
                    />
                </View>
                <View>
                    <TitleSection
                        title="New Release"
                        font="antdesign"
                    />
                    <FlatList
                        horizontal
                        data={movieList.slice(0, 5)}
                        keyExtractor={(item, index) => item.id.toString()}
                        renderItem={renderItem}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <View>
                    <TitleSection
                        title="TV Show"
                        font="antdesign"
                    />
                    <FlatList
                        horizontal
                        data={tvList.slice(0, 5)}
                        keyExtractor={(item, index) => item.id.toString()}
                        renderItem={(val) => renderItem(val, 'tv')}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
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
        backgroundColor: color.black,
        marginTop: StatusBar.currentHeight,
        paddingBottom: hp(10)
    },
    listContent: {
        height: '90%',
        backgroundColor: color.lightGrey,
        paddingHorizontal: margin.horizontal
    },
    titleSection: (x) => ({
        color: x ? 'yellow' : color.light,
        marginRight: x ? wp(2) : 0,
        fontSize: x ? fontSize.extraSmall : fontSize.extraMedium,
        fontWeight: 'bold'
    }),
    content: {
        paddingHorizontal: margin.horizontal,
        marginVertical: hp(2),
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%'
    },
    eventItem: (index) => ({
        flexDirection: 'row',
        marginLeft: index == 0 ? wp(4.5) : wp(3),
        marginRight: index !== 2 ? 0 : wp(4.5),
    }),
    slide: () => ({
        height: hp(35)
    }),
})