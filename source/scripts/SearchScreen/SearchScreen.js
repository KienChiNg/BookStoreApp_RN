import React from "react";
import { debounce } from "lodash";
import { Dimensions, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from "react-native";
import Colors from "../Const/Colors";
import Icon, { Icons } from "../Const/Icons";
import imgHeader from "../../assets/pexels-lisa-fotios-1516983.jpg"
import categories from "../FakeDB_Test_CommingSoon/Categories";
import bookData2 from "../FakeDB_Test_CommingSoon/FakeDB";
import API from "../Const/Const"
import Loading from "../Loading/Loading";

const { width, height } = Dimensions.get("window")

export default function HomeScreen({ navigation }) {
    const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
    const [txtSearch, setTxtSearch] = React.useState("");
    const [bookRender, setBookRender] = React.useState([]);
    const [bookData, setBookData] = React.useState([]);
    const [isLoading,setLoading] = React.useState(false)


    React.useEffect(() => {
        SearchBook()
    }, [txtSearch])

    React.useEffect(() => {
        (async () => {
            InitData();
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
                session: `${API.sessionID}`,
                title: "",
                limit: -1
            })
        }
        await fetch(`${API.API}/book/get_books`, options)
            .then((response) => response.json())
            .then(response => {
                if (response.code == 200) {
                     setBookData(response.result.list);
                }
                else {
                }
            });
        // setBookData(bookData2.listbook.result.list);
        console.log("SearchScreen");
        setLoading(false)
        // setBookRender(bookData2.result.list);
    }

    const SearchBook = () => {
        if (txtSearch.length <= 0)
            setBookRender([])
        else {
            const newData = bookData.filter(item => {
                const itemData = `${item.book_title.toUpperCase()} ${item.book_title.toUpperCase()}`;
                const textData = txtSearch.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setBookRender(newData)
        }
    }

    const Card = ({ book }) => {
        return (
            <TouchableHighlight
                underlayColor={Colors.white} activeOpacity={0.6} onPress={() => { navigation.navigate('DetailScreen', { item: book, hasCart: false }); }}
            >
                <View style={styles.card}>
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
                        {/* <TouchableOpacity
                            style={styles.addToCartBtn}
                            onPress={() => AddBookToCart(book.book_id)}
                        >
                            <Icon type={Icons.Feather} name={'plus'} color={Colors.white} />
                        </TouchableOpacity> */}
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={navigation.goBack}>
                    <Icon type={Icons.Feather} name={'chevron-left'} color={Colors.black} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: Colors.black }}>Search</Text>
            </View>
            <View style={{ flexDirection: "row", paddingHorizontal: width * 0.04 }}>
                <View style={styles.inputContainer}>
                    <Icon type={Icons.Feather} name={'search'} color={Colors.primary} />
                    <TextInput
                        style={{ flex: 1, fontSize: width * 0.04, color: Colors.black }}
                        placeholder="Search for book"
                        onChangeText={debounce(setTxtSearch, 400)}
                    />
                </View>
                {/* <View style={styles.sortBtn}>
                    <Icon type={Icons.MaterialIcons} name={'tune'} color={Colors.white} />
                </View> */}
            </View>
            <View style = {{marginHorizontal: width *0.04, justifyContent: 'center', marginVertical:  width *0.04, alignItems:'flex-start',}}>
                <Text style = {{fontWeight:'600', color: Colors.black}}>{bookRender.length} Result Found</Text>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={bookRender}
                renderItem={({ item }) => <Card book={item} />}
            />
            <Loading isLoading={isLoading}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
        marginHorizontal: 20,
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
    categoryBtn: {
        height: 45,
        width: 120,
        marginRight: 7,
        borderRadius: 30,
        alignItems: 'center',
        paddingHorizontal: 5,
        flexDirection: 'row',
    },
    card: {
        height: 350,
        width: width / 2 - 20,
        marginHorizontal: 10,
        marginBottom: 20,
        marginTop: 50,
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