import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from "react-redux";
import { addCount, minusCount, deleteItem } from '../store';
import './Cart.css';

function Cart() {
    let item = useSelector((state)=>{ return state })
    let dispatch = useDispatch();
    return(
        <>
            <div className="cart-inner inner">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {item.movies.map((item, index) => {
                        return(
                            item.id ? 
                            <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td><button value={item.id} onClick={(event)=>{
                                dispatch(minusCount(event.target.value))
                            }}>-</button>{item.count}<button value={item.id} onClick={(event)=>{
                                dispatch(addCount(event.target.value))
                            }}>+</button></td>
                            <td><button onClick={()=>{
                                dispatch(deleteItem(item))
                            }}>Delete</button></td>
                        </tr> : null
                        )
                    })}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default Cart;