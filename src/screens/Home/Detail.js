import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, StyleSheet, StatusBar, View, ScrollView, Image, ImageBackground, FlatList, RefreshControl, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from "react-redux"
import { getListMovieAction, getListTVAction } from "../../redux/actions/movieAction"
import { AppStyles, BaseUrlImage } from '../../config'
import { colors, Icon } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import { hp, wp } from '../../utils/Responsive'

const { color, font, fontColor, fontSize, margin } = AppStyles

const Detail = (props) => {
    const dispatch = useDispatch()
    const { movieList, tvList } = useSelector(state => state.movie)
    const { data, type } = props.route.params

    const fetchData = () => {
        dispatch(getListMovieAction())
        dispatch(getListTVAction())
    }

    // useEffect(() => { fetchData() }, [])

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
                <ImageBackground source={{ uri: `${BaseUrlImage}${data?.poster_path}` || 'https://heduparts.com/uploads/placeholder.png' }} style={{ height: hp(35) }} >
                    <LinearGradient
                        style={{ width: '100%', height: '100%', justifyContent: 'flex-end', paddingHorizontal: wp(4.5) }}
                        colors={['rgba(255, 255, 255, 0)', 'rgba(0, 0, 0, 0.6)']}
                    >
                        <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ position: 'absolute', top: hp(3), left: wp(3), backgroundColor: 'rgba(0, 0, 0, 0.3)', borderRadius: wp(5), paddingVertical: wp(1), paddingHorizontal: wp(1.3) }}>
                            <Icon name="chevron-back" type="ionicon" color={color.light} size={25} />
                        </TouchableOpacity>
                        <Text numberOfLines={1} style={{ color: color.primary, fontWeight: 'bold', marginBottom: hp(1) }}>Fantasy</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: hp(0.8) }}>
                            {renderStar(5)}
                            <Text style={{ color: color.light }}>• Release Year : {data?.release_date.slice(0, 4)}</Text>
                        </View>
                        <Text numberOfLines={1} style={{ color: color.light, fontSize: fontSize.semiLarge, fontWeight: 'bold', marginBottom: hp(2) }}>{data.title}</Text>
                    </LinearGradient>
                </ImageBackground>
                <View style={{ paddingHorizontal: wp(4.5), paddingTop: hp(2.5) }}>
                    <Text style={styles.titleSection()}>Synopsis</Text>
                    <Text style={{ color: 'white', fontSize: fontSize.extraSmall, paddingVertical: wp(4.5), paddingHorizontal: wp(5), backgroundColor: 'gray', marginTop: hp(2) }}>{data?.overview}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: hp(2.5) }}>
                        <Text numberOfLines={1} style={{ color: 'white', fontSize: fontSize.semiMedium - 0.5, maxWidth: '88%' }}>Cast :
                            <Text style={{ color: 'white', fontSize: fontSize.semiMedium - 0.5, fontWeight: 'bold' }}> Gal Gadot, Kristen Wiig, Chris Pine</Text>
                        </Text>
                        <TouchableOpacity>
                            <Text style={{ color: 'yellow', fontSize: fontSize.semiMedium - 0.5, fontWeight: 'bold' }}>, more</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ paddingHorizontal: wp(4.5), paddingTop: hp(1.5), borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'gray' }}>
                    <Text style={styles.titleSection()}>Episodes</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginVertical: hp(2) }}>
                        <TouchableOpacity activeOpacity={0.5} style={{ width: '35%' }}>
                            <ImageBackground source={{ uri: `${BaseUrlImage}${data?.poster_path}` || 'https://heduparts.com/uploads/placeholder.png' }} style={{ height: hp(9), width: '100%', justifyContent: 'center' }}>
                                <Icon name="play" type="ionicon" color={color.light} size={22} containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.55)', position: 'absolute', alignSelf: 'center', padding: wp(3), borderRadius: wp(5) }} />
                            </ImageBackground>
                        </TouchableOpacity>
                        <View style={{ height: '100%', width: '62%' }}>
                            <TouchableOpacity activeOpacity={0.5}>
                                <Text numberOfLines={1} style={{ color: 'white', fontSize: fontSize.semiMedium - 0.5, fontWeight: 'bold' }}>1 - {data?.title || data?.name}</Text>
                            </TouchableOpacity>
                            <Text style={{ color: color.light, marginVertical: hp(0.7) }}>2h 30m</Text>
                            <Text numberOfLines={2} style={{ color: color.light }}>{data?.overview}</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <TitleSection
                        title="You Might Also Like This"
                        font="antdesign"
                    />
                    <FlatList
                        horizontal
                        data={movieList.slice(0, 3)}
                        keyExtractor={(item, index) => item.id.toString()}
                        renderItem={renderItem}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
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