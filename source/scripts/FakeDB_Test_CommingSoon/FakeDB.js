import img from '../../assets/studio-media-9DaOYUYnOls-unsplash.jpg'
export default {
    listbook: {
        "result": {
            "total": 13,
            "list": [
                {
                    "book_price": 199000,
                    "book_typeo": {
                        "type_name": "Kỳ ảo",
                        "type_note": "created by dattp",
                        "type_id": 11
                    },
                    "book_release_date": "2022-12-01",
                    "book_title": "Harry Potter",
                    "book_image": img,
                    "book_number": 99,
                    "book_author": "J. K. Rowling",
                    "book_create_date": "2022-12-24 17:43:23",
                    "book_id": 28,
                    "book_description": "dattp",
                    "book_page_number": -1,
                    "book_is_new": false
                },
                {
                    "book_price": 99000,
                    "book_typeo": {
                        "type_name": "Anime",
                        "type_id": 6
                    },
                    "book_release_date": "1995-06-19",
                    "book_title": "Naruto",
                    "book_image": img,
                    "book_number": 99,
                    "book_author": "Kishimoto Masashi",
                    "book_create_date": "2022-12-19 11:41:56",
                    "book_id": 21,
                    "book_page_number": -1,
                    "book_is_new": false
                },
                {
                    "book_type": "",
                    "book_typeo": {
                        "type_name": "Trinh thám",
                        "type_id": 1
                    },
                    "book_number": 97,
                    "book_author": "Conan Doyle",
                    "book_id": 20,
                    "book_description": "",
                    "book_is_new": false,
                    "book_price": 100000,
                    "book_release_date": "1867-01-17",
                    "book_title": "Sherlock Holmes",
                    "book_image": img,
                    "book_number": 98,
                    "book_author": "Nhật Hạ",
                    "book_create_date": "2022-11-29 12:00:00",
                    "book_id": 5,
                    "book_description": "",
                    "book_page_number": 100,
                    "book_is_new": false
                },
                {
                    "book_type": "Type 5",
                    "book_price": 100000,
                    "book_release_date": "2022-12-04",
                    "book_title": "Nghìn lẻ một đêm",
                    "book_image": img,
                    "book_create_date": "2022-11-29 12:00:00",
                    "book_page_number": -1
                },
                {
                    "book_type": "",
                    "book_typeo": {
                        "type_name": "Văn học",
                        "type_id": 5
                    },
                    "book_number": 97,
                    "book_author": "Nguyễn Du",
                    "book_id": 13,
                    "book_description": "",
                    "book_is_new": false,
                    "book_price": 100000,
                    "book_release_date": "1820-01-01",
                    "book_title": "Truyện Kiều",
                    "book_image": img,
                    "book_create_date": "2022-11-29 12:00:00",
                    "book_page_number": -1
                },
                {
                    "book_type": "",
                    "book_typeo": {
                        "type_name": "Kinh dị",
                        "type_id": 3
                    },
                    "book_number": 94,
                    "book_author": "Trương Phúc Đạt",
                    "book_id": 15,
                    "book_description": "",
                    "book_is_new": false,
                    "book_price": 100000,
                    "book_release_date": "2022-12-04",
                    "book_title": "Ác mộng kinh hoàng",
                    "book_image": img,
                    "book_create_date": "2022-11-29 12:00:00",
                    "book_page_number": 200
                }
            ]
        },
        "code": 200,
        "description": "Thành công"
    },

    getcart: {
        "result": {
            "cart": {
                "books": [
                    {
                        "book_price": 100000,
                        "book_release_date": "1969-12-23",
                        "book_title": "Doraemon",
                        "book_number": 1,
                        "book_image": img,
                        "book_author": "Fujiko Fujio",
                        "book_id": 2,
                        "book_page_number": -1
                    },
                    {
                        "book_price": 199000,
                        "book_typeo": {
                            "type_name": "Kỳ ảo",
                            "type_note": "created by dattp",
                            "type_id": 11
                        },
                        "book_release_date": "2022-12-01",
                        "book_title": "Harry Potter",
                        "book_image": img,
                        "book_number": 99,
                        "book_author": "J. K. Rowling",
                        "book_create_date": "2022-12-24 17:43:23",
                        "book_id": 28,
                        "book_description": "dattp",
                        "book_page_number": -1,
                        "book_is_new": false
                    },
                    {
                        "book_price": 99000,
                        "book_typeo": {
                            "type_name": "Anime",
                            "type_id": 6
                        },
                        "book_release_date": "1995-06-19",
                        "book_title": "Naruto",
                        "book_image": img,
                        "book_number": 99,
                        "book_author": "Kishimoto Masashi",
                        "book_create_date": "2022-12-19 11:41:56",
                        "book_id": 21,
                        "book_page_number": -1,
                        "book_is_new": false
                    },  
                ]
            }
        },
        "code": 200,
        "description": "Thành công"
    },

    profile: {
        "result": {
            "member": {
                "mem_username": "kiennca",
                "mem_avatar": img,
                "mem_id": 1,
                "mem_group": "admin",
                "mem_email": "kiennc@gmail.com",
                "mem_fullname": "Nguyen Chi Kien"
            }
        },
        "code": 200,
        "description": "Thành công"
    }
}