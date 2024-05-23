import React, { forwardRef } from "react";
import GorhomBottomSheet, { BottomSheetFlatList as GorhomBottomSheetFlatList, BottomSheetBackdrop } from "@gorhom/bottom-sheet";

const _internal_BottomSheetFlatList = forwardRef((props, ref) => {
    return <GorhomBottomSheetFlatList {...props} ref={ref} />;
});

const _internal_BottomSheet = forwardRef((props, ref) => {
    const { index, snapPoints, onChange, style, children, ...rest } = props;

    return (
        <GorhomBottomSheet
            index={index}
            snapPoints={snapPoints}
            onChange={onChange}
            enablePanDownToClose={true}
            backdropComponent={BottomSheetBackdrop}
            style={style || { padding: 20 }}
            {...rest}
            ref={ref}
        >
            {children}
        </GorhomBottomSheet>
    );
});

const BottomSheet = Object.assign(_internal_BottomSheet, {
    BottomSheetFlatList: _internal_BottomSheetFlatList,
});

export default BottomSheet;
