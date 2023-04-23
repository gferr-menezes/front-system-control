declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $visualInput: Record<string, unknown>;
  }
}

export {};
