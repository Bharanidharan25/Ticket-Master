import React, { Component } from 'react'
import {Modal,Button} from "react-bootstrap"

export default class ShowDetailModal extends Component {
    render() {
        return (
            <div>
                <Modal show={this.props.show} onHide={this.props.onHide}>
                    <Modal.Header closeButton>
                    <Modal.Title>{this.props.type}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {(this.props.type==="customer") ?
                            (
                                <>
                                    <p><b>ID : </b> {this.props.data._id}</p>
                                    <p><b>Name : </b> {this.props.data.name}</p>
                                    <p><b>Email : </b>{this.props.data.email}</p>
                                    <p><b>Mobile : </b>{this.props.data.mobile}</p>
                                </>
                            ):(
                                <>
                                    <p><b>ID : </b> {this.props.data._id}</p>
                                    <p><b>Name : </b> {this.props.data.name}</p>
                                    <p><b>Email : </b>{this.props.data.email}</p>
                                    <p><b>Mobile : </b>{this.props.data.mobile}</p>
                                    <p><b>Department : </b>{this.props.data.department && this.props.data.department.name}</p>
                                </>
                            )}
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onHide}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
