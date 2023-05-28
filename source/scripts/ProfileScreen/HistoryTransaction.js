import React from "react";
import { SafeAreaView, StyleSheet, View, Text, Image, FlatList, TouchableOpacity, Alert, Modal, Dimensions } from 'react-native';
import Colors from "../Const/Colors";
import Icon, { Icons } from "../Const/Icons";
import bookData2 from "../FakeDB_Test_CommingSoon/FakeDB";
import API from "../Const/Const"
import Loading from "../Loading/Loading";

const { width, height } = Dimensions.get("window")

const HistoryTransactionScreen = ({ navigation }) => {
    const [bookRender, setBookRender] = React.useState([]);
    const [dataBooked, setDataBooked] = React.useState([]);
    const [isLoading, setLoading] = React.useState(false)
    const [modalVisible, setModalVisible] = React.useState(false);

    React.useEffect(() => {
        (async () => {
            await InitData();
        })();
    }, []);

    const InitData = async () => {
        setLoading(true)
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                session: API.sessionID,
                date_from: "2022-01-01",
            })
        }
        await fetch(`${API.API}/boooking/get_history_transaction`, options)
            .then((response) => response.json())
            .then(response => {
                console.log(response);
                if (response.code == 200) {
                    setBookRender(response.list)
                    // console.log(response.result.list);
                }
                else {

                }
            });
        setLoading(false)
    }

    // const SetListBooked = (data) => {
    //     // setDataBooked(data.bookeds)
    //     setModalVisible(true)
    //     // console.log("alo");
    // }

    const CartCard = (props) => {
        // console.log(props.item.bookeds);
        return (
            <TouchableOpacity style={style.cartCard}
                onPress={() => { navigation.navigate("HistoryDetailTransactionScreen", { booking_id: props.item.booking_id, date: props.item.date }); }}
            >
                {/* <Image source={props.item.image} style={{ height: 80, width: 80 }} /> */}
                <View
                    style={{
                        height: 130,
                        marginLeft: 10,
                        // paddingVertical: 15,
                        justifyContent: "space-around",
                        flex: 1,
                    }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: Colors.black }}>Transaction {props.index + 1}: </Text>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', color: Colors.black }}>ID order: <Text style={{fontWeight:"normal"}}>{` #${props.item.booking_id}`}</Text> </Text>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', color: Colors.black }}>Date of transaction: <Text style={{fontWeight:"normal"}}>{` ${props.item.date}`}</Text></Text>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', color: Colors.black }} >Payment methods: <Text style={{fontWeight:"normal"}}>{` ${props.item.payment_type}`}</Text></Text>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', color: Colors.black }}>Amount:
                        <Text style={{ color: Colors.red }}>{` ${(props.item.amount).toLocaleString("en-GB")} `}</Text>
                        VNĐ</Text>
                </View>
                <View style={{ marginRight: 20, alignItems: 'center' }}>
                    {/* <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{props.item.book_number}</Text> */}
                </View>
            </TouchableOpacity>
        );
    };
    return (
        <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1 }}>
            <View style={style.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon type={Icons.Feather} name={'chevron-left'} color={Colors.black} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: Colors.black }}>Transaction History</Text>
            </View>
            <Text></Text>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 80 }}
                data={bookRender}
                renderItem={({ item, index }) => <CartCard
                    item={item}
                    index={index}
                // SetListBooked = {SetListBooked(item)}
                />}
                ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
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
        height: 140,
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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width: width * 0.9,
        height: height * 0.8,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default HistoryTransactionScreen