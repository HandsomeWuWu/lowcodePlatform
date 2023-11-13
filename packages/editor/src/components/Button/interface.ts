export interface ButtonProps {
    /**
     * @description 按钮内容
     * @default 按钮
     */
    content?: string;
    /**
     * @description 按钮颜色
     * @default default
     */
    color?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
    /**
     * @description 按钮是否禁用
     * @default false
     */
    disabled?: boolean;
    /**
     * @description 填充模式
     * @default solid
     */
    fill?: 'none' | 'solid' | 'outline';
    /**
     * @description 按钮加载状态
     * @default false
     */
    loading?: boolean | 'auto';
    /**
     * @description 按钮加载状态下展示的文字
     */
    loadingText?: string;
    /**
     * @description 按钮形状
     * @default default
     */
    shape?: 'default' | 'rounded' | 'rectangular';
    /**
     * @description 按钮大小
     * @default middle
     */
    size?: 'small' | 'middle' | 'large' | 'mini';
    /**
     * @description 点击事件
     */
    onClick?: AnyFunction;
}