import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Button, Modal } from 'react-bootstrap';

function ModalAdd(props: any) {

    const { show, onClose, onSave, editProdut, onUpdate } = props;
    const [product, setProduct] = useState<{ name: string, description: string, price: number }>({ name: '', description: '', price: 0 });

    useEffect(() => {
        function prepareEdit() {
            const { name, description, price } = editProdut
            setProduct({
                name: name ?? '',
                description: description ?? '',
                price: price ?? 0
            });
        }
        prepareEdit();
    }, [setProduct, editProdut]);

    const handleClose = () => {
        onClose && onClose();
    }

    const handlSubmitData = () => {
        if (Object.keys(editProdut).length) {
            onUpdate && onUpdate({...product, id: editProdut.id});
        } else {
            onSave && onSave(product);
        }
    }

    return (
        <Modal
            backdrop="static"
            keyboard={false}
            size="lg"
            animation={false}
            centered
            show={show}
            onHide={handleClose} bg="dark" variant="dark">
            <Modal.Header closeButton>
                <Modal.Title>Adicionar Produto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group >
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        required={true}
                        type="text"
                        placeholder="nome do produto"
                        onInput={(event: any) => setProduct({ ...product, name: event.target.value })}
                        value={product.name}
                    />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                        required={true}
                        type="text"
                        placeholder="descrição do produto"
                        onInput={(event: any) => setProduct({ ...product, description: event.target.value })}
                        value={product.description}
                    />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Preço</Form.Label>
                    <Form.Control
                        required={true}
                        type="number"
                        placeholder="preço do produto"
                        onInput={(event: any) => setProduct({ ...product, price: event.target.value })}
                        value={product.price}
                    />
                </Form.Group>
                {/*
                <Form.Group >
                <Form.Label>Imagem</Form.Label>
                    <Form.Control
                        type="file"
                        placeholder="imagem do produto"
                        // onInput={(event: any) => setProducts({ ...credentials, email: event.target.value })}
                        // value={credentials.email}
                    />
                </Form.Group>
                */}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Fechar
                </Button>
                <Button variant="primary" onClick={handlSubmitData}>
                    {Object.keys(editProdut).length ? 'Atualizar' : 'Adicionar'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalAdd;