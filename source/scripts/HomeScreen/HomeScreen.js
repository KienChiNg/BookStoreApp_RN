import React from "react";
import { debounce } from "lodash";
import { Alert, Dimensions, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from "react-native";
import Colors from "../Const/Colors";
import Icon, { Icons } from "../Const/Icons";
import imgHeader from "../../assets/user.png"
// import categories from "./Categories";
import bookData2 from "../FakeDB_Test_CommingSoon/FakeDB";
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from "../Const/Const"
import Loading from "../Loading/Loading";
import Toast from 'react-native-toast-message';

const { width, height } = Dimensions.get("window")

export default function HomeScreen({ navigation }) {
    const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
    const [txtSearch, setTxtSearch] = React.useState("");
    const [bookRender, setBookRender] = React.useState([]);
    const [profileData, setProfileData] = React.useState({});
    const [bookData, setBookData] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [isLoading, setLoading] = React.useState(false)
    const [dataSrcCord, setDataSrcCord] = React.useState([])
    const scrollRef = React.useRef();
    // const [focusSelected, setFocusSelected] = React.useState(0);

    React.useEffect(() => {
        SearchBook()
    }, [txtSearch])

    React.useEffect(() => {
        (async () => {
            console.log("HomeScreen", API.sessionID);
            // getData();
            await InitData2();
            await InitData3();
            await InitData();
        })();
    }, []);



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
        await fetch(`${API.API}/member/profile`, options)
            .then((response) => response.json())
            .then(response => {
                if (response.code == 200) {
                    setProfileData(response.result.member);
                }
                else {
                }
            });

        setLoading(false)
        // setProfileData(bookData2.profile.result.member);
    }
    const InitData3 = async () => {
        setLoading(true)
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                session: API.sessionID,
                limit: 1,
            })
        }
        await fetch(`${API.API}/book/get_all_type`, options)
            .then((response) => response.json())
            .then(response => {
                if (response.code == 200) {
                    var arr = [...response.result.list]
                    arr.splice(0, 0, {type_id: -1, type_name: "Toàn bộ"});
                    setCategories(arr)
                }
                else {
                }
            });
        setLoading(false)
        // setProfileData(bookData2.profile.result.member);
    }
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@storage_Key')
            if (value !== null) {
                console.log(value);
            }
        } catch (e) {
            // error reading value
        }
    }

    const SelectedCategory = async (id, index) => {
        // setTxtSearch("")
        if(id != -1){
            setLoading(true)
            var options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    session: `${API.sessionID}`,
                    title: "",
                    limit: -1,
                    type_book: {
                        type_id: id
                    }
                })
            }
            await fetch(`${API.API}/book/get_books`, options)
                .then((response) => response.json())
                .then((response) => {
                    if (response.code == 200) {
                        setBookRender(response.result.list);
                        setSelectedCategoryIndex(index);
                    }
                    else {
                    }
                });
            setLoading(false)
        }else{
            InitData()
            setSelectedCategoryIndex(index);
        }
        // if (dataSrcCord.length - 1 > index)
        scrollRef.current?.scrollTo({
            x: dataSrcCord[index],
            y: 0
        })
    }
    const showToast = (des) => {
        Toast.show({
            type: 'success',
            //   text1: 'Library',
            text1: des,
        });
    }

    const InitData = async () => {
        setLoading(true)
        var options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                session: `${API.sessionID}`,
                title: "",
                limit: -1,
                type_book: {
                    
                }
            })
        }
        await fetch(`${API.API}/book/get_books`, options)
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                if (response.code == 200) {
                    console.log("Success");
                    setBookData(response.result.list);
                    setBookRender(response.result.list);
                }
                else {
                }
            });
        setLoading(false)
    }
    async function image_to_base64(file) {
        let result_base64 = await new Promise((resolve) => {
            let fileReader = new FileReader();
            fileReader.onload = (e) => resolve(fileReader.result);
            fileReader.onerror = (error) => {
                console.log(error)
                // alert('An Error occurred please try again, File might be corrupt');
            };
            fileReader.readAsDataURL(file);
        });
        console.log("result_base64", result_base64)
        // return result_base64;
    }

    const AddBookToCart = async (id) => {
        setLoading(true)
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
                    showToast("Add to cart success")
                    // Alert.alert("Đặt hàng thành công")
                }
                else {
                    console.log("Falure");
                    Alert.alert(response)
                }
            });
        setLoading(false)
        // console.log(id);
    }

    const SearchBook = () => {
        if (txtSearch.length <= 0)
            setBookRender(bookData)
        else {
            const newData = bookRender.filter(item => {
                const itemData = `${item.book_title.toUpperCase()} ${item.book_title.toUpperCase()}`;
                const textData = txtSearch.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setBookRender(newData)
        }
    }

    const ListCategories = () => {
        return (
            <ScrollView
                ref={scrollRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesListContainer}
            >
                {categories.map((category, index) => (
                    <TouchableOpacity
                        key={index}
                        activeOpacity={0.6}
                        onPress={() => SelectedCategory(category.type_id, index)}
                        onLayout={(e) => {
                            const layout = e.nativeEvent.layout
                            dataSrcCord[index] = layout.x
                            setDataSrcCord(dataSrcCord)
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: selectedCategoryIndex == index
                                    ? Colors.primaryDark
                                    : Colors.primaryLite,
                                ...styles.categoryBtn,
                            }}
                        >
                            {/* <View style={styles.categoryBtnImgCon}> */}
                            {/* <Image source={category.image} style={{ height: 20, width: 20, resizeMode: 'cover' }} /> */}
                            {/* </View> */}
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                    textAlign:"center",
                                    // marginLeft: 10,
                                    color: selectedCategoryIndex == index
                                        ? Colors.white
                                        : Colors.primaryDark
                                }}>{category.type_name}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        )
    }
    const Card = ({ book }) => {
        return (
            <TouchableHighlight
            style={{marginTop:10}}
                underlayColor={Colors.white} activeOpacity={0.6} onPress={() => { navigation.navigate('DetailScreen', { item: book, hasCart: false }); }}
            >
                <View style={styles.card}>
                    <View style={{ justifyContent: "center", width: "107%", alignItems: "flex-end", position: "absolute" }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: "red", top:-7 }} numberOfLines={1}>{book.book_is_new ? "New*" : ""}</Text>
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 10 }}>
                        <Image source={{ uri: `data:image/jpeg;base64,${book.book_image}` }} style={{ height: 200, width: 120 }} />
                    </View>
                    <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: Colors.black }} numberOfLines={1}>{book.book_title}</Text>
                            {/* <Text style={{ fontSize: 18, fontWeight: 'bold', color: "red" }} numberOfLines={1}>{book.book_is_new ? "New*" : ""}</Text> */}
                        </View>
                        <Text style={{ fontSize: 14, color: Colors.black, marginTop: 2 }} numberOfLines={1}>{book.book_author}</Text>
                    </View>
                    <View
                        style={{
                            // marginTop: 20,
                            marginHorizontal: 20,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: Colors.black }} ><Text style={{ color: Colors.red }}>{`${book.book_price.toLocaleString("en-GB")} `}</Text>VNĐ</Text>
                        <TouchableOpacity
                            style={styles.addToCartBtn}
                            onPress={() => AddBookToCart(book.book_id)}
                        >
                            <Icon type={Icons.Feather} name={'plus'} color={Colors.white} />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <View style={[styles.header]}>
                <View>
                    <View style={{ width: width *0.6 }} >
                        <Text style={{ fontSize: width * 0.065, fontWeight: 'bold', color: Colors.black }} >Hello,</Text>
                        <Text style={{ fontSize: width * 0.05, fontWeight: 'bold', color: Colors.black }} numberOfLines={1}>{profileData.mem_fullname}</Text>
                    </View>
                    <Text style={{ marginTop: height * 0.006, fontSize: width * 0.055, color: Colors.white }}>
                        What do you want today
                    </Text>
                </View>
                <Image source={profileData.mem_avatar ? { uri: `data:image/jpeg;base64,${profileData.mem_avatar}` } : imgHeader} style={{ height: width * 0.25, width: width * 0.25, borderRadius: 50 }} />
            </View>
            {/* <View style={{ marginTop: height * 0.05, flexDirection: "row", paddingHorizontal: width * 0.04 }}> */}
                {/* <View style={styles.inputContainer}>
                    <Icon type={Icons.Feather} name={'search'} color={Colors.primary} />
                    <TextInput
                        style={{ flex: 1, fontSize: width * 0.04 }}
                        placeholder="Search for book"
                        onChangeText={debounce(setTxtSearch, 400)}
                    />
                </View> */}
                {/* <View style={styles.sortBtn}>
                    <Icon type={Icons.MaterialIcons} name={'tune'} color={Colors.white} />
                </View> */}
            {/* </View> */}
            <View style={{ paddingHorizontal: width * 0.04, }}>
                <ListCategories />
            </View>
            <FlatList
                style={{ marginBottom: 80}}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={bookRender}
                renderItem={({ item }) => <Card book={item} />}
            />
            <Toast />
            <Loading isLoading={isLoading} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: width * 0.04,
        paddingVertical: width * 0.1,
        backgroundColor: Colors.primaryLite
    },
    inputContainer: {
        flex: 1,
        height: 50,
        borderRadius: 10,
        flexDirection: "row",
        backgroundColor: Colors.light,
        alignItems: 'center',
        paddingHorizontal: width * 0.04,
    },
    sortBtn: {
        width: 50,
        height: 50,
        marginLeft: 10,
        borderRadius: 10,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoriesListContainer: {
        paddingVertical: 30,
        alignItems: 'center',
        // paddingHorizontal: width * 0.04,
    },
    categoryBtn: {
        height: 45,
        width: 120,
        marginRight: 7,
        borderRadius: 30,
        alignItems: 'center',
        // paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: "center",
    },
    categoryBtnImgCon: {
        height: 35,
        width: 35,
        backgroundColor: Colors.white,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        height: 350,
        width: width / 2 - 20,
        marginHorizontal: 10,
        marginBottom: 20,
        // marginTop: 50,
        borderRadius: 15,
        elevation: 13,
        backgroundColor: Colors.white,
    },
    addToCartBtn: {
        height: 30,
        width: 30,
        borderRadius: 20,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    }
})