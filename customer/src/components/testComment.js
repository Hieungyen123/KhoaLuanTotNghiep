const [valuesComment, setValuesComment] = useState({
    comment: ""
});
console.log(valuesComment)

const comment = [
    {
        id: 1,
        name: "comment",
        type: "comment",
        placeholder: "type your comment",
        errorMessage: "It should be a valid text!",
        // label: "Comment",
        // required: true,
    },

];

const handleButtonClick = async () => {
    try {
        await axios.post('/Api/customer/comment/' + 1, valuesComment).then((res) => {
            const result = res.data;
            console.log(result)
        })

    } catch (error) {
        // Xử lý lỗi nếu có
        console.error(error);
    }
};
const onChange = (e) => {
    setValuesComment({ ...valuesComment, [e.target.name]: e.target.value });
};



{
    comment.map((input) => (
       
    ))
}
<button onClick={handleButtonClick} >submiit</button>



