import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const Reply = () => {

    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [body, setBody] = useState("");
    const [replies, setReplies] = useState(null); //서버에서 받아온 데이터
    const [editBody, setEditBody] = useState({
        body: "",
    });
    const handlerChangeInput = (e, setState) => setState(e.target.value);

    const handlerSubmit = async (e) => {
        e.preventDefault();
        const URL = 'http://localhost:3001/reply';
        const data = {
            "name": name,
            "body": body,
            "password": password
        }
        const res = await axios.post(URL, data);

        setPassword('');
        setName('');
        setBody('');
    };

    const fetchReply = async () => {
        const URL = 'http://localhost:3001/reply';
        const response = await axios.get(URL);
        setReplies(response.data)
    }

    useEffect(() => {
        fetchReply();
    }, [name, body, password])

    const handlerEdit = async (id, edit) => {
        const { data } = await axios.patch(`http://localhost:3001/reply/${id}`, edit);
        const editedIndex = replies.findIndex(item => item.id === id)
        const editedReplies = [...replies.slice(0, editedIndex),
            data,
        ...replies.slice(editedIndex + 1),]
        setReplies(editedReplies)
    }

    const handlerDelete = async (id) => {
        await axios.delete(`http://localhost:3001/reply/${id}`);
        const deletedIndex = replies.findIndex(item => item.id === id)
        const deletedReplies = [...replies.slice(0, deletedIndex),
        ...replies.slice(deletedIndex + 1)]
        setReplies(deletedReplies)
    }
    console.log(name, body, password)
    console.log(replies)
    return (
        <>
            <form onSubmit={handlerSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="이름"
                    value={name}
                    onChange={(e) => handlerChangeInput(e, setName)}
                />
                <input
                    type="text"
                    name="body"
                    placeholder="댓글"
                    value={body}
                    onChange={(e) => handlerChangeInput(e, setBody)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => handlerChangeInput(e, setPassword)}
                />
                <button type="submit"
                >등록하기</button>
            </form>

            <div>
                {replies && replies.map(reply => {
                    return <StComments key={reply.id}>
                        <div>이름 :{reply.name} 댓글 :{reply.body}</div>
                        <input
                            type="text"
                            placeholder="댓글수정"
                            onChange={(e) => setEditBody({ ...editBody, body: e.target.value })}
                        />
                        <button
                            type="button"
                            onClick={() => handlerEdit(reply.id, editBody)}
                        >수정</button>
                        <button
                            type="button"
                            onClick={() => handlerDelete(reply.id)}
                        >삭제</button>
                    </StComments>
                })}
            </div>
        </>
    );
};

export default Reply;

const StComments = styled.div`
    border: 1px black solid;
`