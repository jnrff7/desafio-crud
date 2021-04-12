import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Table } from 'react-bootstrap';
import { ProductApi } from '../../services/product-api';
import ModalAdd from './modal-add';

import './styles.css';

function Home() {

    const [showModal, setShowModal] = useState(false);
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({});

    useEffect(() => {
        async function refreshProducts() {
            const _products = await ProductApi.list();
            if (_products) {
                setProducts(_products);
            }
        }
        refreshProducts();
    }, [setProducts]);

    const handleOpenModalAdd = () => {
        setProduct({});
        setShowModal(true);
    }

    const handleCloseModalAdd = () => {
        setProduct({});
        setShowModal(false);
    }

    const handleOnSave = async (product: any) => {
        try {
            await ProductApi.save(product);
            const _products = await ProductApi.list();
            if (_products) {
                setProducts(_products);
            }
            setShowModal(false);
        } catch(err: any) {
            alert('Não foi possivel salvar o produto');
        }
    }

    const handleOnUpdate = async (product: any) => {
        try {
            await ProductApi.update(product);
            const _products = await ProductApi.list();
            if (_products) {
                setProducts(_products);
            }
            setShowModal(false);
        } catch(err: any) {
            alert('Não foi possivel atualizar o produto');
        }
    }

    const handleEdit = (product: any) => {
        setProduct(product);
        setShowModal(true);
    }

    const handleDelet = async (id: number) => {
        const response = await window.confirm("Tem certeza que deseja excluir?");
        if (response){
            await ProductApi.delete(id);
            const _products = await ProductApi.list();
            if (_products) {
                setProducts(_products);
            }
        }
    }

    return (
        <>
            <div className="product-list">
                <div className="text-right">
                    <Button
                        onClick={handleOpenModalAdd}
                        variant="primary">
                        Adicionar
                    </Button>
                </div>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>description</th>
                            <th>price</th>
                            <th>published</th>
                            <th>modified</th>
                            <th style={{width: '200px'}}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products && products.map(
                                (p: any, index: number) => (
                                    <tr key={index}>
                                        <td>{p.name}</td>
                                        <td>{p.description}</td>
                                        <td>{p.price}</td>
                                        <td>{p.published_at}</td>
                                        <td>{p.published_up}</td>
                                        <td>
                                            <ButtonGroup
                                                aria-label="Basic example">
                                                <Button
                                                    onClick={() => handleEdit(p)}
                                                    variant="secondary">editar</Button>
                                                <Button
                                                    variant="danger"
                                                    onClick={() => handleDelet(p.id)}>
                                                    remover</Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </Table>
                <div className="text-right">
                    <Button
                        onClick={handleOpenModalAdd}
                        variant="primary">
                        Adicionar
                    </Button>
                </div>
            </div>
            <ModalAdd
                show={showModal}
                editProdut={product}
                onUpdate={handleOnUpdate}
                onClose={handleCloseModalAdd}
                onSave={handleOnSave}
            />
        </>
    );
}

export default Home;