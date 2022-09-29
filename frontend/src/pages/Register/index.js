import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import { useState } from 'react';
import useLocationForm from './Location/useLocationForm';
import Select from 'react-select';
import { NavLink, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import CustomeSelect from './CustomSelect';
import * as Yup from 'yup';

const cx = classNames.bind(styles);

const Register = () => {
    // const [accountCreate, setAccountCreate] = useState({
    //     email: '',
    //     password: '',
    //     roles: 'select',
    //     fullname: '',
    //     birthday: '',
    //     gender: 'select',
    //     phone: '',
    //     cityId: '',
    //     districtId: '',
    //     wardId: '',
    //     street: '',
    //     bloodGroup: 'select',
    // });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            roles: 'select',
            fullname: '',
            birthday: '',
            gender: 'select',
            phone: '',
            cityId: null,
            districtId: null,
            wardId: null,
            bloodGroup: 'select',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Required')
                .matches(
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    'Vui lòng nhập đúng email!',
                ),
            cityId: Yup.number().required('Required').nullable(),
            password: Yup.string()
                .required('Required')
                .matches(
                    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{8,}$/,
                    'Mật khẩu phải có ít nhất 8 ký tự, bao gồm ít nhất 1 chữ cái, 1 số và 1 ký tự đặc biệt',
                ),
        }),

        onSubmit: (value) => {
            console.log(value);
        },
    });

    console.log(formik.values);
    // chon tinh/thanh pho, quan huyen, phuong xa
    const { state, onCitySelect, onDistrictSelect, onWardSelect, onSubmit } = useLocationForm(true);
    const { cityOptions, districtOptions, wardOptions, selectedCity, selectedDistrict, selectedWard } = state;

    return (
        <div className={cx('register-body')}>
            <div className={cx('wrapper', 'mx-auto rounded-2xl bg-white pb-2 shadow-xl ')}>
                <div className={cx('logo')}>
                    <Link to={'/'}>
                        <img src={require('../../assets/images/BC_logo1.png')} alt="BC_LOGO" />
                    </Link>
                </div>
                <h2 className={cx('heading')}>Đăng ký tài khoản</h2>

                <form className="flex flex-col " onSubmit={formik.handleSubmit}>
                    {/* Email */}
                    <div className=" w-full flex-1">
                        <div className="mt-4 h-6 text-2xl font-semibold leading-8 text-gray-800 mb-4">Email</div>
                        <div className="my-2 flex rounded-full border border-gray-200 bg-white">
                            <input
                                className="w-full appearance-none p-5 px-5 text-gray-800 outline-none bg-gray-100 rounded-full text-2xl"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                id="email"
                                name="email"
                                placeholder="Địa chỉ email"
                            />
                        </div>
                        {formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}
                    </div>
                    {/* Password */}
                    <div className=" w-full flex-1">
                        <div className="mt-4 h-6 text-2xl font-semibold leading-8 text-gray-800 mb-4">Mật khẩu</div>
                        <div className="my-2 flex rounded-full border border-gray-200 bg-white">
                            <input
                                className="w-full appearance-none p-5 px-5 text-gray-800 outline-none bg-gray-100 rounded-full text-2xl"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                id="password"
                                name="password"
                                placeholder="Mật khẩu"
                                type="password"
                            />
                        </div>
                        {formik.errors.password ? <div className="error">{formik.errors.password}</div> : null}
                    </div>
                    {/* Roles */}
                    <div className=" w-full flex-1">
                        <div className="mt-4 h-6 text-2xl font-semibold leading-8 text-gray-800 mb-4">Bạn là: </div>
                        <div>
                            <select
                                className="my-2 rounded border border-gray-200 bg-white pt-4 pb-4 pl-2 block w-full text-2xl text-gray-900  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none "
                                id="roles"
                                name="roles"
                                onChange={formik.handleChange}
                                value={formik.values.roles}
                            >
                                <option value="select">Chọn</option>
                                <option value="donor">Người hiến máu</option>
                                <option value="recipient">Người nhận máu</option>
                            </select>
                        </div>
                    </div>

                    {/* Họ và tên */}
                    <div className="w-full flex-1">
                        <div className="mt-4 h-6 text-2xl font-semibold leading-8 text-gray-800 mb-4">Họ và tên</div>
                        <div className="my-2 flex rounded-full border border-gray-200 bg-white">
                            <input
                                onChange={formik.handleChange}
                                value={formik.values.fullname}
                                name="fullname"
                                id="fullname"
                                placeholder="Nhập tên đầy đủ"
                                className="w-full appearance-none p-5 px-5 text-gray-800 outline-none bg-gray-100 rounded-full text-2xl"
                            />
                        </div>
                    </div>
                    {/* Ngay sinh va gioi tinh */}
                    <div className="w-full flex-1 flex flex-row justify-between">
                        <div className="w-1/2 mr-2">
                            <div className="mt-4 h-6 text-2xl font-semibold leading-8 text-gray-800 mb-4">
                                Ngày sinh
                            </div>
                            <div className="my-2 flex rounded-full border border-gray-200 bg-white">
                                <input
                                    onChange={formik.handleChange}
                                    value={formik.values.birthday}
                                    name="birthday"
                                    id="birthday"
                                    className="w-full appearance-none p-5 px-5 text-gray-800 outline-none bg-gray-100 rounded-full text-2xl"
                                    type="date"
                                />
                            </div>
                        </div>
                        <div className="w-1/2 ml-2">
                            <div className="mt-4 h-6 text-2xl font-semibold leading-8 text-gray-800 mb-4">
                                Giới tính:{' '}
                            </div>
                            <div>
                                <select
                                    className="my-2 rounded border border-gray-200 bg-white pt-5 pb-5 pl-2 block w-full text-2xl text-gray-900  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none "
                                    id="gender"
                                    name="gender"
                                    onChange={formik.handleChange}
                                    value={formik.values.gender}
                                >
                                    <option value="select">Chọn giới tính</option>
                                    <option value="male">Nam</option>
                                    <option value="female">Nữ</option>
                                    <option value="another">Khác</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {/* So dien thoai */}
                    <div className="w-full">
                        <div className="mt-4 h-6 text-2xl font-semibold leading-8 text-gray-800 mb-4">
                            Số điện thoại
                        </div>
                        <div className="my-2 flex rounded-full border border-gray-200 bg-white">
                            <input
                                onChange={formik.handleChange}
                                value={formik.values.phone}
                                name="phone"
                                id="phone"
                                placeholder="Gồm 10 chữ số"
                                className="w-full appearance-none p-5 px-5 text-gray-800 outline-none bg-gray-100 rounded-full text-2xl"
                            />
                        </div>
                    </div>
                    {/* Chon dia chi */}
                    <div className="w-full flex-1">
                        <div className="mt-4 h-6 text-2xl font-semibold leading-8 text-gray-800 mb-4">Địa chỉ</div>
                        <CustomeSelect
                            name="cityId"
                            options={cityOptions}
                            className="my-2"
                            value={formik.values.cityId}
                            onChange={(value) => {
                                formik.setFieldValue('cityId', value.value);
                                onCitySelect(value);
                            }}
                            placeholder="Tỉnh/Thành"
                        />
                        {formik.errors.cityId ? <div className="error">{formik.errors.cityId}</div> : null}

                        <CustomeSelect
                            name="districtId"
                            options={districtOptions}
                            className="my-2"
                            value={formik.values.districtId}
                            onChange={(value) => {
                                formik.setFieldValue('districtId', value.value);
                                onDistrictSelect(value);
                            }}
                            placeholder="Quận/Huyện"
                        />
                        {formik.errors.districtId ? <div className="error">{formik.errors.districtId}</div> : null}

                        <CustomeSelect
                            name="wardId"
                            options={wardOptions}
                            className="my-2"
                            value={formik.values.wardId}
                            onChange={(value) => {
                                formik.setFieldValue('wardId', value.value);
                                onWardSelect(value);
                            }}
                            placeholder="Phường/Xã"
                        />
                        {formik.errors.wardId ? <div className="error">{formik.errors.wardId}</div> : null}
                    </div>

                    <input
                        name="street"
                        id="street"
                        placeholder="Số nhà"
                        className="w-full appearance-none p-5 px-5 text-gray-800 outline-none bg-gray-100 rounded-full text-2xl"
                    />
                    {/* Nhom mau */}
                    <div className="w-full flex-1">
                        <div className="mt-4 h-6 text-2xl font-semibold leading-8 text-gray-800 mb-4">Nhóm máu</div>
                        <select
                            className="my-2 rounded border border-gray-200 bg-white pt-5 pb-5 pl-2 block mb-6 w-full text-2xl text-gray-900  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none "
                            id="bloodGroup"
                            name="bloodGroup"
                            onChange={formik.handleChange}
                            value={formik.values.bloodGroup}
                        >
                            <option value="select">Chọn nhóm máu</option>
                            <option value="o+">O+</option>
                            <option value="o-">O-</option>
                            <option value="a+">A+</option>
                            <option value="a-">A-</option>
                            <option value="b+">B+</option>
                            <option value="b-">B-</option>
                            <option value="ab+">AB+</option>
                            <option value="ab-">AB-</option>
                        </select>
                    </div>

                    <button className={cx('btn-register')} type="submit">
                        Đăng ký
                    </button>
                </form>

                <hr />
                <p className={cx('footer')}>
                    Bạn đã có tài khoản?
                    <NavLink to="/login" className={cx('btn-login')}>
                        Đăng nhập
                    </NavLink>
                </p>
            </div>
        </div>
    );
};

export default Register;
