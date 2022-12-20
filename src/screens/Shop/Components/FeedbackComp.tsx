import React from "react";
import { View, StyleSheet, Text, FlatList, SectionList } from "react-native";
import FastImage from "react-native-fast-image";
import { Rating } from "react-native-ratings";
import { Feedback } from "../../../shared";

const FeedbackCompComp = ({ listFeedback }: any) => {
    const [data, setData] = React.useState<Feedback[]>([]);

    React.useEffect(() => {
        setData(listFeedback)
    }, [listFeedback])
    console.log(data)
    const FeedbackItem = (index: number, key: any) => {
        return <View style={styles.wrapItem} key={key}>
            <View style={{ flex: 1, height: 1, backgroundColor: "gray", marginBottom: 5 }} />
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {data[index].user_id}
            </Text>
            <View style={{ width: 120, marginVertical: 10 }}>
                <Rating
                    ratingCount={5}
                    startingValue={data[index].rating}
                    readonly={true}
                    imageSize={20}
                />
            </View>
            <Text>
                {data[index].content}
            </Text>
            {
                !data[0].image_url
                    ?
                    <View />
                    :
                    <FastImage
                        source={{ uri: data[index].image_url }}
                        style={styles.wrapImage}
                        resizeMode={"cover"}
                    />
            }
        </View>
    }
    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.txtTitle}>
                    {`Product Feedback`}
                </Text>
                <Text style={{
                    fontSize: 16, fontWeight: "normal",
                    marginBottom: 10
                }}>
                    {` (${data?.length} feedbacks)`}
                </Text>
                {
                    data.map((item: any, index: number) => {
                        return FeedbackItem(index, index)
                    })
                }
            </View>
            <View style={{ height: 50 }} />
        </View>
    );
}

export const FeedbackComp = React.memo(FeedbackCompComp)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "white",
        borderRadius: 10,
    },
    wrapImage: {
        aspectRatio: 1,
        margin: 10,
        width: 100,
    },
    txtTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    wrapItem: {
        marginVertical: 10
    }
});
