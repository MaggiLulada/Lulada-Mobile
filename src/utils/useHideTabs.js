import { useNavigation, useRoute, getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { useLayoutEffect } from "react";

export const useHideTabsHook = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const tabHiddenRoutes = ['EditProfile', 'PaymentAndTaxes'];
    useLayoutEffect(() => {
        if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
            navigation.setOptions({ 
                tabBarStyle: {
                    display: Platform.OS === 'android' && 'none',
                    height: Platform.OS === 'ios' ? '-5%' : 0,
                },
            });
            
        }else{
            navigation.setOptions({ tabBarStyle: {  height: Platform.OS === 'ios' ? 90 : 60 } });
        }

    }, [navigation, route, tabHiddenRoutes]);
};