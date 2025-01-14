'use client'
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import playersData from "./sample/dummy_players.json"
import { DATA_GRID_DEFAULT_SLOTS_COMPONENTS } from '@mui/x-data-grid/internals';
type PlayerData ={
    option: boolean;
    id: number | null;
    name: string;
    gameid: string;
    agent: string;
}
export default function Page(){
    const [data, setData] = useState<Array<PlayerData>>([])
    
    useEffect(() => {
        const initializedData = playersData.map((player: Omit<PlayerData, 'option'>) => ({
          ...player,
          option: false, // 全て初期状態では未選択にする
        }));
        setData(initializedData);
      }, []);
    
    const handleCheckboxChange = (id: number) => {
        setData((data) =>
          data.map((data) =>
            data.id === id ? { ...data, option: !data.option } : data
          )
        );
    }
    
    return (
        <>
        <h2>プレイヤーを選択する</h2>
        <table>
            <thead>
                <tr>
                <th>選択</th>
                <th>プレイヤー名</th>
                <th>プレイヤーID</th>
                </tr>
            </thead>
            <tbody>
                {data.map((data: any)=>(
                <tr key = {data.id}>
                <input
                type="checkbox"
                checked={data.option}
                onChange={() => handleCheckboxChange(data.id)}
                 />
                <td>{data.name}</td>
                <td>{data.gameid}</td>
                </tr>
            ))}
            </tbody>
        </table>
        <button>構成を検索する</button>
        </>
    )
}