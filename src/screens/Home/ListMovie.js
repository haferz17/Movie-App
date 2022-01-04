import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, StyleSheet, StatusBar, View, ActivityIndicator, ImageBackground, FlatList, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from "react-redux"
import { getListMovieAction, getListTVAction } from "../../redux/actions/movieAction"
import { AppStyles, BaseUrlImage, DETAIL, placeholder } from '../../config'
import { Icon } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import { hp, wp } from '../../utils/Responsive'

const { color, fontSize, margin } = AppStyles
let isLoadMore = false

const ListMovie = (props) => {
    const dispatch = useDispatch()
    const { movieList, tvList, similarList, isLoading, pages, similarPages, tvPages } = useSelector(state => state.movie)
    const [page, setPage] = useState(1)
    const { type } = props.route.params
    const data = type == 'new' ? movieList : type == 'similar' ? similarList : tvList
    const pageList = type == 'new' ? pages : type == 'similar' ? similarPages : tvPages

    const fetchData = (val, reset) => {
        type ?
            dispatch(getListMovieAction({ page: val || 1, reset })) :
            dispatch(getListTVAction({ page: val || 1, reset }))
    }

    const loadMore = () => {
        if (data.length % 10 == 0 && !isLoadMore && !isLoading && page + 1 <= pageList) {
            isLoadMore = true
            setPage(page + 1)
            fetchData(page + 1)
        }
    }

    useEffect(() => { fetchData(1, true) }, [])

    const renderStar = (val) => {
        let count = []
        for (let a = 0; a < val; a++) count.push(a)
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {count.map(() => <Icon name="star" type="ionicon" color={color.light} size={14} style={{ marginRight: wp(1) }} />)}
            </View>
        )
    }

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => props.navigation.navigate(DETAIL, { data: item })}
                style={styles.eventItem(index)} >
                <ImageBackground source={{ uri: `${BaseUrlImage}${item?.poster_path}` || placeholder }} style={styles.poster} >
                    <LinearGradient
                        style={{ width: '100%', height: '100%' }}
                        colors={['rgba(255, 255, 255, 0)', 'rgba(0, 0, 0, 0.5)']}
                    >
                        <View style={styles.itemContainer}>
                            <Text numberOfLines={1} style={{ color: color.primary }}>Fantasy</Text>
                            {renderStar(5)}
                            <Text numberOfLines={2} style={styles.title()}>{item?.name || item?.title}</Text>
                        </View>
                    </LinearGradient>
                </ImageBackground>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={styles.container()}>
            <StatusBar backgroundColor="transparent" translucent />
            <View style={styles.row}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Icon name="chevron-back" type="ionicon" color={color.light} size={25} />
                </TouchableOpacity>
                <Text style={styles.titleSection()}>{type == 'new' ? 'New Release' : type == 'similar' ? 'You Might Also Like This' : 'TV Show'}</Text>
            </View>
            <FlatList
                numColumns={2}
                data={data}
                keyExtractor={(item, index) => item.id.toString()}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
                refreshing={isLoading}
                onRefresh={() => fetchData(1, true)}
                onEndReachedThreshold={0.2}
                onEndReached={loadMore}
                onMomentumScrollBegin={() => isLoadMore = false}
                ListFooterComponent={() => {
                    if (data.length && data.length % 10 == 0 && data.length >= 10 && isLoading)
                        return <ActivityIndicator size={'large'} color={'yellow'} style={{ marginVertical: hp(1) }} />
                    else return null
                }}
                contentContainerStyle={{ paddingHorizontal: wp(4.5) }}
            />
        </SafeAreaView>
    );
};

export { ListMovie }

const styles = StyleSheet.create({
    container: () => ({
        flex: 1,
        backgroundColor: color.black,
    }),
    titleSection: () => ({
        color: color.light,
        marginLeft: wp(3),
        fontSize: fontSize.extraMedium + 1,
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
        marginLeft: index % 2 == 0 ? 0 : wp(3),
        marginBottom: wp(3),
    }),
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: wp(4.5),
        paddingVertical: hp(2)
    },
    poster: {
        width: wp(44),
        height: wp(63),
        borderRadius: hp(0.3)
    },
    itemContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: wp(2.5),
        paddingHorizontal: wp(2)
    },
    title: () => ({
        color: color.light,
        fontSize: fontSize.medium - 1,
        fontWeight: 'bold',
        marginTop: hp(0.5)
    })
})