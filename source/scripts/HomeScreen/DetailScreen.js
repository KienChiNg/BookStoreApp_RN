import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, FlatList, Dimensions, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../Const/Colors';
import Icons from '../Const/Icons';
import API from "../Const/Const"
import imgHeader from "../../assets/pexels-lisa-fotios-1516983.jpg"
import star from "../../assets/star.png"
import star1 from "../../assets/star1.png"
import star2 from "../../assets/star2.png"
import imgSend from "../../assets/send.png"
import Toast from 'react-native-toast-message';


const { width, height } = Dimensions.get("window")
const DetailsScreen = ({ navigation, route }) => {
    const item = route.params;
    const [moreDetail, setMoreDetail] = React.useState(false);
    const [cmt, setCmt] = React.useState("")
    const [starRender, setStarRender] = React.useState([])
    const [isRate, setIsRate] = React.useState(false)
    const [starRate, setStarRate] = React.useState(5)
    const [getComments, setComments] = React.useState([
        // {
        //     member: { member_fullname: "Nguyen Chi Kien" },
        //     member_content: "Hay",
        //     comment_star: 5,
        //     comment_date: "20-11-2020"
        // },
        // {
        //     member: { member_fullname: "Nguyen Chi Kien" },
        //     member_content: "Deo hay",
        //     comment_star: 2,
        //     comment_date: "20-11-2020"
        // }
    ]);
    React.useEffect(() => {
        (async () => {
            await InitData();
            RenderStar2(0);
            setIsRate(false)
        })();
    }, []);

    const InitData = async () => {
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                session: API.sessionID,
                book: {
                    book_id: item.item.book_id,
                }
            })
        }
        await fetch(`${API.API}/book/get_comments`, options)
            .then((response) => response.json())
            .then(response => {
                if (response.code == 200) {
                    setComments(response.result.list)
                    console.log("Success");

                }
                else {
                    console.log("Falure");
                }
            });
    }

    const AddBookToCart = async (id) => {
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                session: API.sessionID,
                book: {
                    book_id: id,
                    book_number: 1
                }
            })
        }
        await fetch(`${API.API}/cart/add_book`, options)
            .then((response) => response.json())
            .then(response => {
                if (response.code == 200) {
                    console.log("Success");
                    showToast("Add to cart success","success")
                    // Alert.alert("Đặt hàng thành công")
                }
                else {
                    console.log("Falure");
                    Alert.alert(response)
                }
            });
        console.log(id);
    }
    const RenderStar = (num) => {
        starListArr = [];
        for (i = 0; i < num; i++) {
            starListArr.push(
                <Image key={i} source={star} style={{ height: 10, width: 10, borderRadius: 500 }} />
            )
        }
        return starListArr
    }
    const RenderStar2 = (show) => {
        if (show != 0) setIsRate(true)
        let starListArr = [];
        for (i = 0; i < show; i++) {
            starListArr.push(
                <TouchableOpacity key={i} onPress={RenderStar2.bind(this, i + 1)}>
                    <Image source={star1} style={{ height: 30, width: 30, borderRadius: 500 }} />
                </TouchableOpacity>
            )
        }
        for (i = show; i < 5; i++) {
            starListArr.push(
                <TouchableOpacity key={i} onPress={RenderStar2.bind(this, i + 1)}>
                    <Image source={star2} style={{ height: 30, width: 30, borderRadius: 500 }} />
                </TouchableOpacity>
            )
        }
        setStarRender(starListArr)
        // console.log(show);
        setStarRate(show)
        // return starListArr
    }
    const showToast = (des,ty) => {
        Toast.show({
            type: ty,
            //   text1: 'Library',
            text1: des,
        });
    }
    const SendMessage = async () => {
        if (cmt.trim() == "") {
            // Alert.alert("Bạn cần phải viết thêm bình luận")
            showToast("Please add a comment","error")
            return
        }
        if (!isRate) {
            // Alert.alert("Bạn cần phải đánh giá sao")
            showToast("Let's rate the stars","error")
            return
        }
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                session: API.sessionID,
                book: {
                    book_id: item.item.book_id,
                },
                star: starRate,
                content: cmt,
            })
        }
        await fetch(`${API.API}/book/add_comment`, options)
            .then((response) => response.json())
            .then(response => {
                if (response.code == 200) {
                    console.log("Success");
                    // Alert.alert("Bình luận thành công")
                    showToast("Comment Success","success")
                    setCmt("")
                    RenderStar2(0);
                }
                else {
                    console.log("Falure");
                    showToast(response.description,"error")
                }
            });
        // console.log(id);
        await InitData();
    }
    return (
        <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1 }}>
            <View style={style.header}>
                <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
                <Text style={{ fontSize: 20, fontWeight: 'bold',color:Colors.black }}>Details</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 400,
                    }}>
                    <Image source={{ uri: `data:image/jpeg;base64,${item.item.book_image}` }} style={{ height: 310, width: 220 }} />
                </View>
                <View style={style.details}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        <View style={{
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            // alignItems: 'center',
                        }}>
                            <Text
                                style={{ fontSize: 25, fontWeight: 'bold', color: Colors.white }}>
                                {item.item.book_title}
                            </Text>
                            <Text
                                style={{ fontSize: 18, fontWeight: '', color: Colors.gray }}>
                                {item.item.book_author}
                            </Text>
                            <Text
                                style={{ fontSize: 18, fontWeight: 'bold', color: Colors.white }}>
                                {(item.item.book_price).toLocaleString("en-GB")} VNĐ
                            </Text>
                        </View>
                        {/* <View style={style.iconContainer}> */}
                        {/* <Icon name="favorite-border" color={Colors.primary} size={25} /> */}
                        {/* </View> */}
                    </View>
                    <Text style={style.detailsText} numberOfLines={moreDetail ? 100000000 : 2}>
                        {item.item.book_description}
                    </Text>
                    <TouchableOpacity onPress={() => setMoreDetail(!moreDetail)} style={{ justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                        <Text style={{ color: Colors.white, fontSize: 18, fontWeight: "bold" }} >{moreDetail ? "Thu nhỏ" : "Xem thêm"}</Text>
                    </TouchableOpacity>
                    {!item.hasCart && (<View style={{ marginTop: 40, marginBottom: 40 }}>
                        <TouchableOpacity activeOpacity={0.6} onPress={() => AddBookToCart(item.item.book_id)}>
                            <View style={{ ...style.btnContainer, backgroundColor: Colors.white }}>
                                <Text style={{ ...style.title, color: Colors.primary }}>Add to cart</Text>
                            </View>
                        </TouchableOpacity>
                    </View>)}
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ fontSize: 14, color: Colors.white, fontWeight: "bold", marginBottom: 10 }} numberOfLines={1}>Đánh giá</Text>
                        <View style={{ flexDirection: "row" }}>
                            {starRender}
                        </View>
                    </View>
                    <View style={{ marginTop: 20, flex: 1 }}>
                        <TextInput
                            style={style.txtinput}
                            onChangeText={username => setCmt(username)}
                            value={cmt}
                            placeholder="Nhập bình luận"
                            placeholderTextColor="#84878a"
                            backgroundColor="#fff"
                        />
                        <View style={{ position: "absolute", height: "100%", width: "100%", justifyContent: "center", alignItems: "flex-end", paddingRight: 20 }}>
                            <TouchableOpacity onPress={() => SendMessage()}>
                                <Image source={imgSend} style={{ height: 20, width: 20 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ borderBottomWidth: 1, borderColor: Colors.darkGray, paddingBottom: 20 }}>
                        {getComments.map((comments, index) => (
                            // console.log(comments.member.member_avatar),
                            <View style={{ flex: 1, marginTop: 20, borderTopWidth: 1, paddingTop: 20, borderColor: Colors.darkGray }}
                                key={index}
                            >
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    {/* <Image source={{ uri: `data:image/jpeg;base64,${book.book_image}` }} style={{ height: 200, width: 120 }} /> */}
                                    <Image source={comments.member.member_avatar ?{ uri: `data:image/jpeg;base64,${comments.member.member_avatar}` }:imgHeader} style={{ height: 50, width: 50, borderRadius: 500 }} />
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 10, color: Colors.white }} numberOfLines={1}>{comments.member.member_fullname}</Text>
                                </View>
                                <View style={{ marginLeft: 60 }}>
                                    <View style={{ flexDirection: "column" }}>
                                        <View style={{ flexDirection: "row", justifyContent: "flex-start", width: 70 }}>
                                            {RenderStar(comments.comment_star)}
                                            {/* <Text style={{ fontSize: 14, fontWeight: 'bold', color: Colors.white }} numberOfLines={1}>{comments.comment_star}</Text> */}
                                        </View>
                                        <View style={{ borderBottomWidth: 1, paddingVertical: 10, borderColor: Colors.darkGray }}>
                                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: Colors.white }} numberOfLines={1}>{comments.comment_content}</Text>
                                        </View>
                                        {/* <Text style={{ fontSize: 18, fontWeight: 'bold', color:Colors.white }} numberOfLines={1}>{comments.comment_star}</Text> */}
                                        <View style={{ marginTop: 10 }}>
                                            <Text style={{ fontSize: 10, color: Colors.white }} numberOfLines={1}>{comments.comment_date}</Text>
                                        </View>
                                        {/* <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 10, color: "red" }} numberOfLines={1}>{book.book_is_new ? "New*" : ""}</Text> */}
                                    </View>
                                    {/* <Text style={{ fontSize: 14, color: Colors.gray, marginTop: 2 }} numberOfLines={1}>{book.book_author}</Text> */}
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
            <Toast />
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
    details: {
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: '80%',
        backgroundColor: Colors.primary,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
    },
    iconContainer: {
        backgroundColor: Colors.white,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    detailsText: {
        marginTop: 10,
        lineHeight: 22,
        fontSize: 16,
        color: Colors.white,
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
    txtinput: {
        paddingLeft: 20,
        flex: 1,
        borderRadius: 25,
        color: '#000000',
        borderColor: '#dcdcdc',
        borderWidth: 2,
    },
});

export default DetailsScreen;