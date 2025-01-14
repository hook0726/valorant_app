'use client'
import{useState, useEffect} from 'react'
import productsData from "./sample/dummy_products.json"
type ProductData = {
    id: number;
    name: string;
    price: number;
    description: string;
}
export default function Page(){
    //読み込みデータを保持
    const [data, setData] = useState<Array<ProductData>>([]);
    
    useEffect(()=>{
        setData(productsData);
    })
    return (
    <>
        <h2>商品一覧</h2>
        <button>商品を追加する</button>
        <table>
            <thead>
                <tr>
                    <th>商品ID</th>
                    <th>商品名</th>
                    <th>単価</th>
                    <th>説明</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>コットン100%ピンクリボン</td>
                    <td>6900</td>
                    <td>大人の愛らしさを引き立てる、ナチュラルな風合い</td>
                    <td><button>更新・削除</button></td>
                </tr>
                {data.map((data: any)=>(
                    <tr key = {data.id}>
                        <td>{data.name}</td>
                        <td>{data.price}</td>
                        <td>{data.descripton}</td>
                        <td>
                            <button>更新・削除</button>
                        </td>
                    </tr>
                ))}
                <tr>
                    <td>2</td>
                    <td>ライトストレッチカットソー</td>
                    <td>2980</td>
                    <td>しなやかな肌触りが心地よい</td>
                    <td><button>更新・削除</button></td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>ベルト付きデニムパンツ</td>
                    <td>5980</td>
                    <td>定番のデニムパンツに、フェミニンなベルトをプラスした</td>
                    <td><button>更新・削除</button></td>
                </tr>
            </tbody>
        </table>
    </>
    )
}