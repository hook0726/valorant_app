'use client'
import React, { useState, useEffect } from 'react';
import playersData from "./sample/dummy_players.json"
import Link from "next/link";
import { DATA_GRID_DEFAULT_SLOTS_COMPONENTS } from '@mui/x-data-grid/internals';
type PlayerData ={
    id: number | null;
    name: string;
    gameid: string;
    agent: string;
}
type InputData = {
    id: string;
    name: string;
    gameid: string;
    agent: string;
}


//登録データの値を更新

export default function Page(){
    
    const [data, setData] = useState<Array<PlayerData>>([])
    
    useEffect(() => {
        setData(playersData)
    }, [])
    
    //登録データを保持
    const[input, setInput] = useState<InputData>({
        id: "",
        name: "",
        gameid: "",
        agent: ""
    })
    
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) =>{
        const { value, name } = event.target
        setInput(({...input, [name]: value}))
    }
    const [shownNewRow, setShownNewRow] = useState(false);
    const handleShownewRow = (event: React.MouseEvent<HTMLElement>) =>{
        event.preventDefault();
        setShownNewRow(true);
    };
    const handleAddCancel = (event: React.MouseEvent<HTMLElement>) =>{
        event.preventDefault();
        setShownNewRow(false);
    };
    const handleAdd = (event: React.MouseEvent<HTMLElement>) =>{
        event.preventDefault();
        //バックエンドを使用した登録処理を呼ぶ
        setShownNewRow(false);
    };
    
    //更新・削除処理、更新・削除行の表示状態を保持
    const [editingRow, setEditingRow] = useState(0);
    const handleEditRow: any = (id: number) =>{
        setShownNewRow(false)
        setEditingRow(id)
        const selectedPlayer: PlayerData = data.find((v)=>v.id===id) as PlayerData;
        setInput({
            id: id.toString(),
            name: selectedPlayer.name,
            gameid: selectedPlayer.gameid,
            agent: selectedPlayer.agent
        });
    };
    const handleEditCancel: any = (id: number) =>{
        setEditingRow(0)
    };
    const handleEdit: any = (id: number) =>{
        setEditingRow(0)
    };
    const handleDelete: any = (id: number) =>{
        setEditingRow(0)
    };
    return (
        <>
        <h2>プレイヤー一覧</h2>
        <button onClick={ handleShownewRow }>プレイヤーを追加する</button>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>名前</th>
                    <th>プレイヤーID</th>
                    <th>エージェント</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {shownNewRow ? (
                    <tr>
                        <td></td>
                        <td><input type = "text" name = "name" onChange={handleInput}/></td>
                        <td><input type = "text" name = "gameid" onChange={handleInput}/></td>
                        <td><input type = "text" name = "agent" onChange={handleInput}/></td>
                        <td></td>
                        <td><button onClick={(event)=>handleAddCancel(event)}>キャンセル</button><button onClick={(event)=>handleAdd(event)}>登録する</button></td>
                    </tr>
                ): ""}
                {data.map((data: any) => (
                    editingRow === data.id?(
                        <tr key = {data.id}>
                            <td>{data.id}</td>
                            <td><input type = "text" value = {input.name} defaultValue={data.name}/></td>
                            <td><input type = "text" value = {input.gameid} defaultValue={data.gameid}/></td>
                            <td><input type = "text" value = {input.agent} defaultValue={data.agent}/></td>
                            <td></td>
                            <td><button onClick={()=>handleEditCancel(data.id)}>キャンセル</button><button onClick={()=>handleEdit(data.id)}>更新する</button><button onClick={()=>handleDelete(data.id)}>削除する</button></td>
                        </tr>
                    ):(
                    <tr key = {data.id}>
                    <td>{data.id}</td>
                    <td>{data.name}</td>
                    <td>{data.gameid}</td>
                    <td>{data.agent}</td>
                    <td><Link href = {'/valorant/players/${data.id}'}>プレイヤー詳細</Link></td>
                    <td><button onClick={()=>handleEditRow(data.id)}>更新・削除</button></td>
                    </tr>
                    )
                ))}
            </tbody>
        </table>
        </>
    )
}