import React from 'react'
import { Text, StyleSheet, View, ImageBackground, FlatList, TouchableOpacity } from 'react-native'
import { AppStyles, BaseUrlImage, DETAIL, placeholder } from '../../config'
import { Icon } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import { hp, wp } from '../../utils/Responsive'

const { color, fontSize, margin } = AppStyles

const Section = ({ title, data, style = {}, onPress = () => null, onPressItem = () => null }) => {
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
                onPress={() => onPressItem(item)}
                style={styles.eventItem(index)} >
                <ImageBackground source={{ uri: `${BaseUrlImage}${item?.poster_path}` || placeholder }} style={styles.poster2} >
                    <LinearGradient
                        style={{ width: '100%', height: '100%' }}
                        colors={['rgba(255, 255, 255, 0)', 'rgba(0, 0, 0, 0.5)']}
                    >
                        <View style={styles.itemContainer}>
                            <View>
                                <Text numberOfLines={1} style={styles.genre()}>Fantasy</Text>
                            </View>
                            {renderStar(5)}
                            <Text numberOfLines={2} style={styles.title2()}>{item.name || item.title}</Text>
                        </View>
                    </LinearGradient>
                </ImageBackground>
            </TouchableOpacity>
        )
    }

    return (
        <View style={style}>
            <View style={styles.content}>
                <Text style={styles.titleSection()}>{title || ''}</Text>
                <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.titleSection('see')}>See All</Text>
                    <Icon name="chevron-forward" type="ionicon" color={'yellow'} size={22} />
                </TouchableOpacity>
            </View>
            <FlatList
                horizontal
                data={data}
                keyExtractor={(item, index) => item.id.toString()}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

export { Section }

const styles = StyleSheet.create({
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
        marginRight: index !== 4 ? 0 : wp(4.5),
    }),
    poster2: {
        width: wp(41.5),
        height: wp(63),
        borderRadius: hp(0.3)
    },
    itemContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: wp(2.5),
        paddingHorizontal: wp(2)
    },
    title2: () => ({
        color: color.light,
        fontSize: fontSize.medium - 1,
        fontWeight: 'bold',
        marginTop: hp(0.5)
    }),
    genre: () => ({
        color: color.primary,
        fontWeight: 'bold',
        backgroundColor: 'rgba(15,239,253,0.15)',
        paddingHorizontal: 5,
        paddingVertical: 2,
        position: 'absolute',
        bottom: 0
    }),
})