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
        <FormInput
            key={input.id}
            {...input}
            value={valuesComment[input.name]}
            onChange={onChange}
        />
    ))
}
<button onClick={handleButtonClick} >submiit</button>



const handleSubmitCheckToken = (e) => {
    e.preventDefault();
    const refreshToken = localStorage.getItem("refreshToken");
    console.log(refreshToken)
    const config = { refreshToken: refreshToken }
    // const config = { headers: { 'x-access-token': refreshToken } };

    axios.post('/api/customer/refreshtoken', config).then((res) => {
        const result = res;
        console.log(result.data)
        localStorage.setItem('accessToken', result.data.accessToken);
        localStorage.setItem('refreshToken', result.data.newRefreshToken);
        Context.setToken(result.data.accessToken);
        Context.setCustomer(result.data.customer);
    })
}