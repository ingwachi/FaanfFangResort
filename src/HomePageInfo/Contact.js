import React from 'react';
import { Form} from 'antd';
import '../css/contact.css'
class Contact extends React.Component {
    render() {
        return (
            <div>
                <section class="contact-section bg-black">
                    <div class="container">

                        <div class="row">

                            <div class="col-md-4 mb-3 mb-md-0">
                                <div class="card py-4 h-100">
                                    <div class="card-body text-center">
                                        <i class="fas fa-map-marked-alt text-primary mb-2"></i>
                                        <h4 class="text-uppercase m-0">Address</h4>
                                        <hr class="my-4" />
                                        <div class="small text-black-50">444 Pluakdaeng,Rayong ,Thailand 21140</div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-4 mb-3 mb-md-0">
                                <div class="card py-4 h-100">
                                    <div class="card-body text-center">
                                        <h4 class="text-uppercase m-0">Email</h4>
                                        <hr class="my-4" />
                                        <div class="small text-black-50">
                                            <a href="#">fang-fangs@hotmail.com</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-4 mb-3 mb-md-0">
                                <div class="card py-4 h-100">
                                    <div class="card-body text-center">
                                        <i class="fas fa-mobile-alt text-primary mb-2"></i>
                                        <h4 class="text-uppercase m-0">Phone</h4>
                                        <hr class="my-4" />
                                        <div class="small text-black-50">0819404674</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Form.create()(Contact);