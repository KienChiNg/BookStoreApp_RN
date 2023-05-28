import React from "react";
import { SafeAreaView, StyleSheet, View, Text, Image, FlatList, TouchableOpacity, Alert, TextInput } from 'react-native';
import Colors from "../Const/Colors";
import Icon, { Icons } from "../Const/Icons";
import bookData2 from "../FakeDB_Test_CommingSoon/FakeDB";
import API from "../Const/Const"
import img from "../../assets/pexels-anete-lusina-6353764.jpg"
import Loading from "../Loading/Loading";

const DetailHistoryScreen = ({ navigation, route }) => {
    const [bookRender, setBookRender] = React.useState(route.params.item);
    const [isLoading, setLoading] = React.useState(false)
    const [voucherRender, setVoucherRender] = React.useState("");
    // React.useEffect(() => {
    //     (() => {
    //          InitData();
    //     })();
    // }, []);

    // const InitData = () => {
    //     // console.log(item.voucher_booking_type);
    //     let str = ""
    //     if (route.params.voucher.voucher_booking_type == "%") {
    //         str = `- ${route.params.voucher.voucher_booking_value}${route.params.voucher.voucher_booking_type}`
    //     }
    //     else if (route.params.voucher.voucher_booking_type == "n") {
    //         str = `- ${route.params.voucher.voucher_booking_value.toLocaleString("en-GB")}VNĐ`
    //     }
    //     setVoucherRender(str)
    //     console.log(voucherRender);
    // }

    const CartCard = (props) => {
        // console.log(props.item.book);
        return (
            <TouchableOpacity style={style.cartCard}
                onPress={() => { navigation.navigate('DetailScreen', { item: { ...props.item.book, book_price: props.item.booked_price }, hasCart: true }); }}
            >
                <Image source={props.item.book.book_image && { uri: `data:image/jpeg;base64,${props.item.book.book_image}` }} style={{ height: 80, width: 80 }} />
                <View
                    style={{
                        height: 120,
                        marginLeft: 10,
                        paddingVertical: 10,
                        flex: 1,
                        justifyContent: "space-between"
                    }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 17, color: Colors.black }} numberOfLines={1}>{props.item.book.book_title}</Text>
                    <Text style={{ fontSize: 15, color: Colors.black }} numberOfLines={1}>
                        {props.item.book.book_author}
                    </Text>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', color: Colors.black }}>
                        <Text style={{ color: Colors.red }}>
                            {`${(props.item.booked_price * props.item.booked_number).toLocaleString("en-GB")} `}
                        </Text>VNĐ</Text>
                    <Text style={{ fontSize: 15, color: Colors.black }} numberOfLines={1}>
                        Amount: {props.item.booked_number}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        console.log(route.params.voucher),
        <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1 }}>
            <View style={style.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon type={Icons.Feather} name={'chevron-left'} color={Colors.black} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: Colors.black }}>Purchase History Details</Text>
            </View>
            <Text></Text>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 80 }}
                data={bookRender}
                renderItem={({ item, index }) => <CartCard
                    item={item}
                />}
                ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
                ListFooterComponent={() => (
                    <View>
                        <View
                            style={{
                                flexDirection: 'row',
                                // justifyContent: 'space-between',
                                // alignItems: "center",
                                marginBottom: 15,
                            }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', marginRight: 30, color: Colors.black }}>
                                Address:
                            </Text>
                            <View behavior="padding" style={{ width: 270 }}>
                                <Text
                                    style={{ fontSize: 18, color: Colors.black }}
                                >
                                    {route.params.address}
                                </Text>
                            </View>
                        </View>
                        
                        {route.params.voucher != -1 && (<View
                            style={{
                                flexDirection: 'row',
                                // justifyContent: 'space-between',
                                // alignItems: "center",
                                marginBottom: 15,
                            }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', marginRight: 30, color: Colors.black }}>
                                Voucher:
                            </Text>
                            <View behavior="padding" style={{ width: 270 }}>
                                <Text
                                    style={{ fontSize: 18, color: Colors.black }}
                                >
                                    {(route.params.voucher.voucher_booking_type == "%")?
                                        `- ${route.params.voucher.voucher_booking_value}${route.params.voucher.voucher_booking_type}` :
                                        `- ${route.params.voucher.voucher_booking_value.toLocaleString("en-GB")}VNĐ`
                                    }
                                </Text>
                            </View>
                        </View>)}
                    </View>
                )}
            />
            <Loading isLoading={isLoading} />
        </SafeAreaView>
    );
};
const style = StyleSheet.create({
    header: {
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    cartCard: {
        height: 120,
        elevation: 15,
        borderRadius: 10,
        backgroundColor: Colors.white,
        marginVertical: 10,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionBtn: {
        width: 80,
        height: 30,
        backgroundColor: Colors.primary,
        borderRadius: 30,
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    title: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 18
    },
    btnContainer: {
        backgroundColor: Colors.primary,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default DetailHistoryScreen