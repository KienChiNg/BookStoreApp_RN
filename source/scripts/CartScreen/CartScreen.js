import React from "react";
import { SafeAreaView, StyleSheet, View, Text, Image, FlatList, TouchableOpacity, Alert, LogBox, Modal, TextInput, Dimensions, ScrollView, KeyboardAvoidingView, Linking } from 'react-native';
import Colors from "../Const/Colors";
import Icon, { Icons } from "../Const/Icons";
import bookData2 from "../FakeDB_Test_CommingSoon/FakeDB";
import API from "../Const/Const"
import Loading from "../Loading/Loading";
import { useFocusEffect } from '@react-navigation/native';
import ModalDropdown from 'react-native-modal-dropdown';
import Toast from 'react-native-toast-message';

const { width, height } = Dimensions.get("window")
const CartScreen = ({ navigation }) => {
    const [bookRender, setBookRender] = React.useState([]);
    const [voucher, setVoucher] = React.useState([]);
    const [voucherRender, setVoucherRender] = React.useState([]);
    const [voucherInd, setVoucherInd] = React.useState(-1);
    const [product, setProduct] = React.useState([]);
    const [sumItem, setSumItem] = React.useState(0);
    const [isChange, setChange] = React.useState(false);
    const [isLoading, setLoading] = React.useState(false)
    const [modalVisible, setModalVisible] = React.useState(false)
    const [address, setAddress] = React.useState("");
    const [selected, setSelected] = React.useState(0);
    const [profileData, setProfileData] = React.useState([])
    const text = React.useRef(null);

    React.useEffect(() => {
        (async () => {
            await InitData();
            await InitData2();
            // await InitData3();
        })();
    }, []);
    // useFocusEffect(
    //     React.useCallback((bookRender) => {
    //         // setBookRender(prods => ({ ...prods, [id]: bookRender }))
    //         // console.log(bookRender.length);
    //         return () => {
    //             BeforeExit(bookRender);
    //         }
    //     }, [])
    // )
    const InitData3 = async () => {
        setLoading(true)
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                session: API.sessionID,
            })
        }
        await fetch(`${API.API}/member/profile`, options)
            .then((response) => response.json())
            .then(response => {
                if (response.code == 200) {
                    setProfileData(response.result.member);
                    console.log(response);
                }
                else {
                }
            });

        setLoading(false)
        // setProfileData(bookData2.profile.result.member);
    }
    const BeforeExit = async () => {
        // console.log(b.length);
        // if (b.length != 0) {
        // console.log("aloooo", b);
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                session: API.sessionID,
                books: bookRender
            })
        }
        await fetch(`${API.API}/cart/add_books`, options)
            .then((response) => response.json())
            .then(response => {
                console.log(response);
                if (response.code == 200) {
                    console.log("Success2");
                }
                else {
                    console.log("Falure2");
                }
            });
    }
    // navigation.goBack()
    const InitData = async () => {
        setLoading(true)
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                session: API.sessionID,
            })
        }
        await fetch(`${API.API}/cart/get_cart`, options)
            .then((response) => response.json())
            .then(response => {
                // console.log(response.result.cart);
                if (response.code == 200) {
                    setBookRender(response.result.cart.books);
                    // SumInit(response.result.cart.books)
                    // setSumItem();
                }
                else {
                }
            });
        setLoading(false)
        // setBookRender(bookData2.getcart.result.cart.books);
        // console.log(bookRender);

    }
    const InitData2 = async () => {
        setLoading(true)
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                session: API.sessionID,
            })
        }
        await fetch(`${API.API}/boooking/get_voucher_booking_active`, options)
            .then((response) => response.json())
            .then(response => {
                // console.log(response.result.cart);
                if (response.code == 200) {
                    setVoucher(response.result.list);
                    setVoucherInd(0)
                    // 
                    // SumInit(response.result.cart.books)
                    // setSumItem();
                }
                else {
                }
            });
        setLoading(false)
        // setBookRender(bookData2.getcart.result.cart.books);
        // console.log(bookRender);

    }
    const SetArrVoucher = async () => {
        let arr = []
        await voucher.map(item => {
            // console.log(item.voucher_booking_type);
            let str = ""
            if (item.voucher_booking_type == "%") {
                str = `- ${item.voucher_booking_value}${item.voucher_booking_type}`
            }
            else if (item.voucher_booking_type == "n") {
                str = `- ${item.voucher_booking_value.toLocaleString("en-GB")}VNĐ`
            }
            arr.push(str)
        })
        setVoucherRender(arr)
        // console.log(voucherRender);
    }
    const SumInit = (arr) => {
        let sum = 0;
        arr.map((item) => {
            sum += item.book_price * item.book_number
        })
        // console.log(sum);
        setSumItem(sum);
    }

    const CartCard = (props) => {
        return (
            <TouchableOpacity style={style.cartCard}
                onPress={() => { navigation.navigate('DetailScreen', { item: props.item, hasCart: true }); }}
            >
                <TouchableOpacity
                    onPress={props.DeleteItem}
                    activeOpacity={0.8}
                    style={{
                        width: '108%',
                        height: '128%',
                        // backgroundColor: 'red',
                        position: 'absolute',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-end',
                    }}
                >
                    <Icon type={Icons.Ionicons} name={'close-outline'} size={30} color={Colors.red} />
                </TouchableOpacity>
                <Image source={{ uri: `data:image/jpeg;base64,${props.item.book_image}` }} style={{ height: 80, width: 80 }} />
                <View
                    style={{
                        height: 100,
                        marginLeft: 10,
                        paddingVertical: 20,
                        flex: 1,
                    }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: Colors.black }} numberOfLines={1}>{props.item.book_title}</Text>
                    <Text style={{ fontSize: 13, color: Colors.black }} numberOfLines={1}>
                        {props.item.book_author}
                    </Text>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', color: Colors.black }}>
                        <Text style={{ color: Colors.red }}>
                            {`${(props.item.book_price * props.item.book_number).toLocaleString("en-GB")} `}
                        </Text> VNĐ</Text>
                </View>
                <View style={{ marginRight: 20, alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, color: Colors.black }}>{props.item.book_number}</Text>
                    <View style={style.actionBtn}>
                        <TouchableOpacity activeOpacity={0.8}
                            onPress={props.DecrementPrice}
                        >
                            <Icon type={Icons.Ionicons} name={'remove-outline'} color={Colors.white} />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8}
                            onPress={props.IncrementPrice}
                        >
                            <Icon type={Icons.Ionicons} name={'add-outline'} color={Colors.white} />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };
    const IncrementPrice = (item, index, state) => {
        // console.log(sumItem);
        bookRender[index].book_number++
        let sum = sumItem + bookRender[index].book_price
        setSumItem(sum);
        setChange(true)
        BeforeExit()
    }
    const DecrementPrice = (item, index) => {
        if (bookRender[index].book_number - 1 != 0) {
            bookRender[index].book_number--
            let sum = sumItem - bookRender[index].book_price
            setSumItem(sum);
            setChange(true)
            BeforeExit();
        }
    }
    const DeleteItem = async (item, index) => {
        setLoading(true)
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                session: API.sessionID,
                book: {
                    book_id: bookRender[index].book_id,
                }
            })
        }
        await fetch(`${API.API}/cart/remove_book`, options)
            .then((response) => response.json())
            .then(response => {
                if (response.code == 200) {
                    console.log("Success");
                    SetArr(index)
                    showToast("Successful removed from cart","success")
                }
                else {
                    console.log("Falure");
                }
            });
        setLoading(false)
    }
    const SetArr = async (index) => {
        let arr = [...bookRender]
        arr.splice(index, 1)
        setBookRender(arr)
        // SumInit(arr)
        console.log("Delete Success");
        // setIsDel(false)
    }
    const Checkout = async () => {
        bookRender.map(item => {
            item.book_note = ""
        })
        // console.log(text.current.value);
        setLoading(true)
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                session: API.sessionID,
                cart: {
                    books: bookRender
                },
                address: text.current.value == undefined ? "Học viện Công nghệ Bưu chính viễn thông, Trần Phú, Mộ Lao, Hà Đông, Hà Nội" : text.current.value,
                payment_type: { mode: selected },
                voucher_booking: [{
                    voucher_booking_id: voucher[voucherInd].voucher_booking_id
                }]
            })
        }
        await fetch(`${API.API}/boooking/add_booking`, options)
            .then((response) => response.json())
            .then(response => {
                console.log(response);
                if (response.code == 200) {
                    if (response.url_payment)
                        Linking.openURL(response.url_payment)
                    // Alert.alert("Đặt hàng thành công")
                    setModalVisible(false)
                    InitData()
                    console.log("Success");
                    showToast("Successful ordering", 'success')
                }
                else {
                    if (response.description == "Không đặt được sách")
                        showToast("There are currently no books in the cart", 'error')
                    // Alert.alert(response.description)
                    else
                        showToast("Let's add an address", 'error')
                    console.log("Falure");
                }
            });
        setLoading(false)

    }
    const SetSumItems = async (ind) => {
        setLoading(true)
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                session: API.sessionID,
                cart: {
                    books: bookRender
                },
                voucher_booking: [ind != -1 && {
                    voucher_booking_id: voucher[ind].voucher_booking_id
                }]
            })
        }
        await fetch(`${API.API}/boooking/get_amount_booking`, options)
            .then((response) => response.json())
            .then(response => {
                // console.log(response);
                if (response.code == 200) {
                    console.log("Success2");
                    setSumItem(response.amount)
                }
                else {
                    console.log("Falure2");
                }
            });
        setLoading(false)
    }
    const Confirm = async () => {
        // console.log(text.current.value);
        // text.current.value = "Học viện Công nghệ Bưu chính viễn thông, Trần Phú, Mộ Lao, Hà Đông, Hà Nội"
        setModalVisible(true)
        await SetArrVoucher()
        await SetSumItems(voucherInd);
    }
    const SelectVoucher = async (ind) => {
        await setVoucherInd(ind)
        await SetSumItems(ind);
    }
    const showToast = (des, ty) => {
        Toast.show({
            type: ty,
            //   text1: 'Library',
            text1: des,
        });
    }

    const CartCard2 = (props) => {
        return (
            <View style={{
                height: 100,
                width: 320,
                elevation: 15,
                borderRadius: 10,
                backgroundColor: Colors.white,
                marginVertical: 10,
                marginHorizontal: 20,
                paddingHorizontal: 10,
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <Image source={{ uri: `data:image/jpeg;base64,${props.item.book_image}` }} style={{ height: 80, width: 80 }} />
                <View
                    style={{
                        height: 100,
                        marginLeft: 10,
                        // paddingVertical: 20,
                        justifyContent: "space-around",
                        flex: 1,
                    }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: Colors.black }} numberOfLines={1}>{props.item.book_title}</Text>
                    <Text style={{ fontSize: 14, color: Colors.black }} numberOfLines={1}>
                        {props.item.book_author}
                    </Text>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', color: Colors.black }}>
                        <Text style={{ color: Colors.red }}>
                            {`${((props.item.book_price * props.item.book_number).toLocaleString("en-GB"))} `}
                        </Text> VNĐ</Text>
                    <Text style={{ fontSize: 14, color: Colors.black }} numberOfLines={1}>
                        {`Amount: ${props.item.book_number}`}
                    </Text>
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1 }}>
            <View style={style.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon type={Icons.Feather} name={'chevron-left'} color={Colors.black} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: Colors.black }}>Cart</Text>
            </View>
            {bookRender.length == 0 && (<Text style={{
                fontWeight: 'bold',
                fontSize: 18,
                textAlign: "center",
                color: Colors.black
            }}>NOTHING IN YOUR CART!!</Text>)}
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 80 }}
                data={bookRender}
                renderItem={({ item, index }) => <CartCard
                    item={item}
                    IncrementPrice={() => IncrementPrice(item, index)}
                    DecrementPrice={() => DecrementPrice(item, index)}
                    DeleteItem={() => DeleteItem(item, index)}
                />}
                ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
                ListFooterComponent={() => (
                    <View>
                        {/* <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginVertical: 15,
                            }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                                Total Price
                            </Text>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                                <Text style={{ color: Colors.red }} >
                                    {`${sumItem} `}
                                </Text>
                                VNĐ</Text>
                        </View> */}
                        <View style={{ marginHorizontal: 30, height: 100 }}>
                            <TouchableOpacity activeOpacity={0.6} onPress={() => Confirm()} ref={text}>
                                <View style={style.btnContainer}>
                                    <Text style={style.title}>CONFIRM</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={style.centeredView}>
                    <View style={style.modalView}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: Colors.black }}>
                            Confirm
                        </Text>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: 80 }}
                            data={bookRender}
                            renderItem={({ item, index }) => <CartCard2 item={item} />}
                            ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
                            ListFooterComponent={() => (
                                <View>

                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: "center",
                                            marginBottom: 15,
                                        }}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginRight: 20, color: Colors.black }}>
                                            Voucher
                                        </Text>
                                        <ModalDropdown
                                            options={voucherRender}
                                            style={{ width: 200, borderBottomWidth: 1, borderBottomColor: Colors.black, paddingBottom: 10 }}
                                            animated
                                            defaultIndex={voucherInd}
                                            defaultValue={voucherRender != -1 ? `${voucherRender[voucherInd]}` : "Nothing!"}
                                            dropdownTextHighlightStyle={{ fontSize: 18, fontWeight: 'bold', color: Colors.primary }}
                                            dropdownStyle={{
                                                width: 200, height: 120, shadowColor: '#000',
                                                shadowOffset: {
                                                    width: 10,
                                                    height: 10,
                                                },
                                                shadowOpacity: 1,
                                                shadowRadius: 4,
                                                elevation: 10,
                                                borderWidth: 1,
                                                paddingLeft: 10,
                                                marginBottom: 10
                                            }}
                                            dropdownTextStyle={{ fontSize: 18, fontWeight: 'bold', color: Colors.black }}
                                            textStyle={{ fontSize: 18, fontWeight: 'bold', color: Colors.black }}
                                            onSelect={(ind) => SelectVoucher(ind)}
                                        />
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: "center",
                                            marginBottom: 15,
                                        }}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginRight: 20, color: Colors.black }}>
                                            Address
                                        </Text>
                                        <KeyboardAvoidingView behavior="padding" style={{ borderBottomWidth: 1, borderBottomColor: Colors.black, width: 200 }}>
                                            <TextInput
                                                ref={text}
                                                style={{ fontSize: 18, fontWeight: 'bold', color: Colors.black }}
                                                placeholderTextColor={Colors.gray}
                                                placeholder="Enter the address"
                                                onChangeText={(txt) => { text.current.value = txt }}
                                                value={text}
                                                defaultValue="Học viện Công nghệ Bưu chính viễn thông, Trần Phú, Mộ Lao, Hà Đông, Hà Nội"
                                            />
                                        </KeyboardAvoidingView>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: "center",
                                            marginBottom: 15,
                                        }}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: Colors.black }}>
                                            Payment methods:
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: "row", marginBottom: 15, alignItems: "center" }}>

                                        <TouchableOpacity style={[{
                                            height: 18,
                                            width: 18,
                                            borderRadius: 12,
                                            borderWidth: 2,
                                            borderColor: '#000',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: 10
                                        }]}
                                            onPress={() => setSelected(0)}
                                        >
                                            {
                                                selected == 0 ?
                                                    <View style={{
                                                        height: 8,
                                                        width: 8,
                                                        borderRadius: 6,
                                                        backgroundColor: '#000',
                                                    }} />
                                                    : null
                                            }
                                        </TouchableOpacity>
                                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: Colors.black }}>Pay on delivery </Text>
                                    </View>
                                    <View style={{ flexDirection: "row", marginBottom: 15, alignItems: "center" }}>

                                        <TouchableOpacity style={[{
                                            height: 18,
                                            width: 18,
                                            borderRadius: 12,
                                            borderWidth: 2,
                                            borderColor: '#000',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: 10
                                        }]}
                                            onPress={() => setSelected(1)}
                                        >
                                            {
                                                selected == 1 ?
                                                    <View style={{
                                                        height: 8,
                                                        width: 8,
                                                        borderRadius: 6,
                                                        backgroundColor: '#000',
                                                    }} />
                                                    : null
                                            }
                                        </TouchableOpacity>
                                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: Colors.black }}>Pay by VNPay</Text>
                                        <Image source={require("../../assets/vnpay.png")} style={{ height: 20, width: 80, marginLeft: 10 }} />
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            marginVertical: 15,
                                        }}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: Colors.black }}>
                                            Total Price
                                        </Text>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: Colors.black }}>
                                            <Text style={{ color: Colors.red }} >
                                                {`${sumItem.toLocaleString("en-GB")} `}
                                            </Text>
                                            VNĐ</Text>
                                    </View>
                                    <View style={{ marginHorizontal: 30, height: 100, marginTop: 20 }}>
                                        <TouchableOpacity activeOpacity={0.6} onPress={() => Checkout()}>
                                            <View style={style.btnContainer}>
                                                <Text style={style.title}>CHECKOUT</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        />
                        <TouchableOpacity
                            style={[style.button, style.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Icon type={Icons.Ionicons} name={'close-outline'} size={20} color={Colors.white} />
                        </TouchableOpacity>
                    </View>
                </View>
                <Toast />
                <Loading isLoading={isLoading} />
            </Modal>
            {!modalVisible && (<Toast />)}
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
        height: 100,
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
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: 380,
        height: 750,
        paddingVertical: 30,
        alignItems: 'center',
        justifyContent: "space-between",
        shadowColor: '#000',
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 10,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        justifyContent: "flex-end",
        backgroundColor: Colors.red,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default CartScreen